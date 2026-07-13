---
title: "Messages & Language"
description: "All user-facing text is MiniMessage-formatted. Text lives in"
---

All user-facing text is **MiniMessage-formatted**. Text lives in
`plugins/dFactions/messages/messages_en.yml`.

> The plugin ships **English-only** for now. Other translations exist in the source but are
> disabled — `allow-player-override` is off and only the `en` bundle is loaded, so `/f language`
> is not offered to players.

## Editing text

1. Open `plugins/dFactions/messages/messages_en.yml`.
2. Edit the value — keep the **placeholder names** (`{faction}`, `{player}`, …) intact.
3. Use [MiniMessage](https://docs.advntr.dev/minimessage/format.html) tags for color/format, e.g.
   `<red>`, `<gradient:#7bd10a:#2e7d32>`, `<bold>`.
4. `/fa reload` to apply.

## Chat prefix & channel formats

- `prefix:` (top of the file) — shown at the start of **every** chat line the plugin sends or
  relays: the public chat tag, and faction/ally chat. Change it to rebrand, or blank it out
  (`prefix: ""`) to disable the global tag entirely.
- `chat.format.faction` / `chat.format.ally` — full line templates used by
  [`/f chat faction` and `/f chat ally`](/plugins/dfactions/commands-and-permissions/#chat-channels), so each
  channel is visually distinct from public chat (default: green `[Faction]` tag, purple `[Ally]`
  tag). Available tokens: `{prefix}` `{faction_tag}` `{player}` `{message}`.

```yaml
chat:
  format:
    faction: "{prefix}<dark_green>[Faction]</dark_green> {faction_tag}<white>{player}</white><gray>: </gray><green>{message}</green>"
    ally: "{prefix}<light_purple>[Ally]</light_purple> {faction_tag}<white>{player}</white><gray>: </gray><light_purple>{message}</light_purple>"
```
