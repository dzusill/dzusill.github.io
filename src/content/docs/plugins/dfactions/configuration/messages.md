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
