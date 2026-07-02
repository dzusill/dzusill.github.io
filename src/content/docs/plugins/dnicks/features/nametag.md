---
title: "The Nametag Above the Head"
description: "The name that floats above a player's head is the one surface dNicks does not render itself. Instead, dNicks publishes the nick as the %dnicksname%…"
---

The name that floats above a player's head is the one surface dNicks does **not** render itself. Instead, dNicks publishes the nick as the `%dnicks_name%` placeholder and lets your dedicated nametag plugin (TAB, and any other that accepts a placeholder) draw the tag. That keeps a **single owner** for the nametag, so your rank prefix and the gradient name live in one tag with no duplicate and no fighting over the scoreboard.

> **TL;DR** — keep your role plugin's prefix/suffix placeholders, swap only the **name** for `%dnicks_name%`. One line of config in TAB does it.

## Why dNicks doesn't draw it

The nameplate above a head is rendered by the **client**, from the scoreboard team packet:

```
team_prefix | teamColor(profileName) | team_suffix
```

`profileName` is the raw Minecraft username — max 16 chars, `[A-Za-z0-9_]`, **one single team color**, no `§`, no hex, no gradient. That is a client rendering limit; ProtocolLib, TAB, and every packet library hit the same wall. The only way to get a per-character gradient above a head is to render the name as **custom text** (an entity / an "unlimited nametag" line) instead of the vanilla name slot.

Your nametag plugin already does exactly that — TAB's *unlimited nametags* replace the name line with custom, RGB-capable text. So rather than dNicks spawning a second competing text entity, it hands the styled nick to the plugin that already owns that line. dNicks feeds; TAB renders.

## Setup with TAB (keep the role, swap the name)

This is the recipe you want: **LuckPerms (or any role plugin) keeps the prefix/suffix, `%dnicks_name%` becomes the name.**

**Requirements:** [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed (so TAB can read `%dnicks_name%`), and TAB's unlimited-nametag feature enabled so the name line can carry hex.

**1. Enable unlimited nametags in TAB** (`TAB/config.yml`) — this lets the name line render full RGB instead of the single-color vanilla slot:

```yml
scoreboard-teams:
  enabled: true
  unlimited-nametag-mode:
    enabled: true
```

**2. Point TAB's nametag at the placeholders** (`TAB/groups.yml`, or per-group / `users.yml`):

```yml
_DEFAULT_:
  tagprefix: "%luckperms_prefix%"    # role prefix — unchanged
  customtagname: "%dnicks_name%"     # the NAME above the head — the gradient nick
  tagsuffix: "%luckperms_suffix%"    # role suffix — unchanged
```

Result above the head:

```
[OWNER] DZUSILL          ← [OWNER] from LuckPerms, DZUSILL is a real gradient
```

`tagprefix` / `tagsuffix` keep whatever your permissions plugin already produced. Only `customtagname` changed — from the vanilla username to the dNicks nick.

## The tab list, same idea

The tab list (hold **Tab**) uses the parallel keys. Either let dNicks own it directly (`surfaces.tablist: true`, the default) **or** let TAB render it from the placeholder — not both:

```yml
_DEFAULT_:
  tabprefix: "%luckperms_prefix%"
  customtabname: "%dnicks_name%"     # needs surfaces.tablist: false in dNicks
  tabsuffix: "%luckperms_suffix%"
```

If TAB owns the tab list this way, set `surfaces.tablist: false` in dNicks so the two don't fight. See [The Tab List](/plugins/dnicks/features/tablist/).

## Other nametag plugins

Any nametag plugin that accepts a placeholder for its name/tag line works the same way: put your role placeholder in the prefix slot and `%dnicks_name%` in the name slot. If the plugin only exposes a single combined line, use:

```
%luckperms_prefix%%dnicks_name%%luckperms_suffix%
```

`%dnicks_name%` is emitted as legacy `§`-hex, so per-character gradient survives for any string-based consumer. See [Placeholders](/plugins/dnicks/placeholders/).

## Live updates

When a player runs `/nick`, dNicks updates its stored nick immediately. The nametag refreshes on your nametag plugin's own cycle — TAB re-resolves placeholders on its refresh interval (typically sub-second), so the new name appears without a relog. No dNicks-side entity is spawned, moved, or cleaned up.

## Migrating from older dNicks

Earlier builds spawned a `TextDisplay` entity above the head and hid the vanilla name via a scoreboard team. That is gone — there is **no** `surfaces.nametag`, `formats.nametag`, or `nametag-display` section anymore. If you upgraded:

- Those keys in an old `config.yml` are simply ignored (harmless). Delete them for a clean file.
- Any leftover text entities from the old version: `/kill @e[type=text_display]` once, then restart.
- Move your old `formats.nametag` content into TAB's `tagprefix` + `customtagname` as shown above.

See [Integrations](/plugins/dnicks/integrations/) for the full TAB + LuckPerms + EssentialsX picture.
