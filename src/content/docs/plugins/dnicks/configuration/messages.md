---
title: "Messages & Language"
description: "All player-facing text lives in plugins/dNicks/lang/en-US.yml and is MiniMessage."
---

All player-facing text lives in `plugins/dNicks/lang/en-US.yml` and is [MiniMessage](https://docs.papermc.io/adventure/minimessage/).

## How it works

- Edit `lang/en-US.yml`. On load, dNicks merges it over the English defaults and writes the result to `messages.yml`.
- **Don't edit `messages.yml`** — it's generated and overwritten. It exists only so the framework can read it.
- `lang_file` in `config.yml` selects which language file under `lang/` is active.

## Tokens

- `<prefix>` expands to the configured `prefix` string.
- `{name}` / `{player}` / `{target}` / `{nick}` / `{max}` / `{min}` / `{tag}` / `{color}` / `{query}` are filled in per message.

dNicks renders and sends its own messages natively, so the gradient prefix and the gradient nick inside a message keep full hex (they are not downsampled to basic colors).

## Example

```yml
prefix: "<gradient:#7F7FFF:#FF7FFF>dNicks</gradient> <dark_gray>»</dark_gray> "
nick:
  set_self: "<prefix><gray>Your nickname is now {name}<reset><gray>."
  no_permission_gradient: "<prefix><red>You don't have permission to use gradients."
realname:
  found: "<prefix><white>{nick}</white> <dark_gray>=</dark_gray> <green>{player}</green>"
```

Apply changes with `/dnicks reload`.
