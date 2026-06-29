---
title: "The Floating Nametag"
description: "The hardest surface. Vanilla Minecraft cannot put a per-character gradient on the name floating above a player's head — and neither can the TAB plugin.…"
---

The hardest surface. Vanilla Minecraft **cannot** put a per-character gradient on the name floating above a player's head — and neither can the TAB plugin. dNicks solves it without a packet library.

## Why vanilla can't do gradients on the nameplate

The nameplate rendered above a player's head is controlled by the client, not the server. The client reads three fields from the scoreboard team packet:

```
team_prefix | teamColor(profileName) | team_suffix
```

`profileName` is the **Minecraft username** — max 16 characters, `[A-Za-z0-9_]` only, **one single team color**, no `§` codes, no hex, no gradient. The client renders it all in that one color. This is a client rendering constraint, not a server or plugin limit. ProtocolLib, TAB, and any other packet library face the same wall — you cannot send per-character hex to the vanilla nameplate field.

The only way to show a gradient above a player's head is to place a **separate text entity** there.

## How dNicks does it — TextDisplay

When a player has a nick and `surfaces.nametag` is enabled, dNicks does two things:

**Step 1 — hide the vanilla name**

Add the player to a scoreboard `Team` whose `NameTagVisibility` is set to `NEVER`. The client stops rendering the white username above their head entirely.

**Step 2 — spawn a TextDisplay entity**

A vanilla [`TextDisplay`](https://papermc.io/javadocs/paper/1.21.1/org/bukkit/entity/TextDisplay.html) entity (added in MC 1.19.4) is spawned above the player and **mounted as a passenger** (`player.addPassenger(display)`). As a passenger it:

- follows the player through all movement, teleports, and vehicles automatically — no per-tick teleport loop needed
- is repositioned with a Y-axis `Transformation` offset to float above the skull
- uses `Billboard.CENTER` so it always faces every viewer

The text is set as a native Adventure `Component` directly — which means **full hex colors and per-character gradients** render correctly on every 1.21 client with no mods or resource packs.

```
        [TextDisplay component: "<gradient:#ff5fa2:#a18fff>DZUSILL</gradient>"]
               passenger ↑  (Y-offset 0.30)
                [Player entity]
```

One shared display per player — the nick looks the same to every viewer — so there are no per-viewer tracking or packet-management concerns.

## Rendering the whole tag — keep the rank prefix & suffix

A gradient **cannot** be injected into another plugin's nametag name slot — that slot is the plain 16-character profile name (see above), so LuckPerms's `[OWNER]` prefix and a TAB nametag can never carry a per-character gradient on the name. Trying to "override just the name" inside someone else's tag is physically impossible for a gradient.

So dNicks does the opposite: it renders the **entire** floating tag itself, and pulls the prefix / suffix / extra lines from the other plugins via **PlaceholderAPI**. You get the rank prefix and a balance line *and* a gradient name, in one tag, with no duplicate.

The `formats.nametag` key accepts a single line **or a list of lines**, and any token may be:

- `%name%` — the gradient nick (spliced in as a real component, so the hex is never downsampled)
- `%player%` — the real username
- **any PlaceholderAPI placeholder** — e.g. `%luckperms_prefix%`, `%luckperms_suffix%`, `%vault_eco_balance_formatted%`

```yml
formats:
  nametag:
    - "%luckperms_prefix%%name%%luckperms_suffix%"
    - "<green>$%vault_eco_balance_formatted%</green>"
```

renders as:

```
[OWNER] DZUSILL          ← prefix from LuckPerms, DZUSILL is a real gradient
$231k                    ← balance from Vault
```

PlaceholderAPI output (legacy `§`/`&`, including LuckPerms's `§x` hex) is parsed back into colors automatically. If PlaceholderAPI isn't installed, those tokens simply render empty and you're left with just the gradient `%name%` — nothing breaks.

## Why not fake entity packets instead?

Sending a fake `TextDisplay` entity via raw packets (e.g. with PacketEvents) achieves the same visual result but with extra complexity:

| | TextDisplay entity | Packet-based fake entity |
|---|---|---|
| Dependency | none (vanilla Bukkit API) | PacketEvents or ProtocolLib |
| Per-viewer nicks | no (same for all) | yes — each viewer gets their own packet stream |
| Entity cap / `/kill @e` | counts, leaks on hard crash | invisible to server, no leak |
| Lifecycle code | Bukkit events handle it | must manually replay spawn on every viewer join/teleport/chunk-load |
| Gradient support | yes | yes |

Packet-based is strictly more powerful but significantly more complex. For a single-server setup where every player sees the same nick, the entity approach is the right trade-off. Packet rewrite makes sense only if you need per-viewer nicks (e.g. staff see the real username; vanished players need a different display).

## Lifecycle management

TextDisplay entities are not persistent across server restarts. dNicks manages their entire lifecycle:

| Event | Action |
|---|---|
| Player join | Spawn display if player has a nick |
| Player quit / kick | Remove display immediately |
| Player death + respawn | Remove on death, re-spawn on `PlayerRespawnEvent` |
| World change / cross-dim teleport | Remove old, re-spawn in new world |
| `/nick set` / `/nick reset` | Refresh text or remove display |
| Plugin disable | `removeAll()` — sweep every active display |
| Hard crash recovery | PDC marker stored on the display entity; swept by `sweepOrphans()` on next startup |

## Settings

```yml
nametag-display:
  y-offset: 0.30          # blocks above the player's head
  billboard: CENTER       # CENTER | VERTICAL | HORIZONTAL | FIXED
                          # CENTER always faces the viewer
  see-through: false      # render through blocks
  shadowed: true          # text shadow
  view-range: 1.0         # vanilla view-range multiplier (keep <= 1.0)
  hide-on-sneak: true     # dim the display while the player is sneaking
  sneak-opacity: 64       # text opacity (0–255) while sneaking
  background: false       # show the dark text-display background plate
  spawn-only-when-nicked: true
    # true  → players without a nick keep their vanilla white name (recommended)
    # false → every player gets a TextDisplay (and loses the vanilla name)
  hide-vanilla: true
    # true  → dNicks hides the vanilla username via its OWN scoreboard team
    # false → another plugin already hides it (e.g. TAB invisible-nametags) — let it,
    #         so dNicks doesn't fight that plugin over team membership
```

## One owner per surface

The vanilla username is hidden by a scoreboard `Team`, and **a player can only be on one team at a time**. If TAB is installed it uses teams for sorting, so dNicks must not run its own hiding team — they would fight and break TAB's sorting.

When running **with TAB**:

- **TAB** `config.yml`: set `scoreboard-teams.invisible-nametags: true` — this hides the vanilla name *and* keeps team sorting — and **disable TAB's own nametag / unlimited-nametag feature** so dNicks' `TextDisplay` is the only floating tag.
- **dNicks** `config.yml`: set `nametag-display.hide-vanilla: false` (TAB is doing the hiding now).

When running **without TAB**, leave `hide-vanilla: true` and dNicks owns everything. dNicks logs this guidance at startup when TAB is detected. See [Integrations](/plugins/dnicks/integrations/).
