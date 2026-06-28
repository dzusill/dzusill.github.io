---
title: "Chat"
description: "When surfaces.chat is enabled (default), dNicks renders each chat line itself using a Paper chat renderer, so the gradient nick shows in chat."
---

When `surfaces.chat` is enabled (default), dNicks renders each chat line itself using a Paper chat renderer, so the gradient nick shows in chat.

## Format

Controlled by `formats.chat` in `config.yml`:

```yml
formats:
  chat: "%name%<dark_gray>:</dark_gray> %message%"
```

| Token | Becomes |
|---|---|
| `%name%` | the player's rendered nick (gradient/colors intact) |
| `%message%` | the chat message body |
| `%player%` | the real username |

Everything else in the string is plain [MiniMessage](https://docs.papermc.io/adventure/minimessage/), so you can add group tags, brackets, etc.

## Beating other chat plugins

dNicks installs its renderer at `EventPriority.HIGHEST` so it wins over plugins that also format chat — notably **EssentialsX**, whose core ships chat formatting. No EssentialsX change is required for chat to work.

If you'd rather another plugin own chat formatting, set `surfaces.chat: false` and have that plugin read the nick from `%dnicks_name%` (needs PlaceholderAPI). See [Integrations](/plugins/dnicks/integrations/).

## Notes

- The renderer only reads the cached nick (it runs off the main thread), so it's safe and fast.
- The nick is the same for every viewer, so everyone sees the same gradient.
