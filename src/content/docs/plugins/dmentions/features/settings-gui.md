---
title: "Settings GUI"
description: "Requires dmentions.configure (default op)."
---

```
/dm config
```

Requires `dmentions.configure` (default op).

An in-game editor for the live configuration. Changes are written back to `config.yml` and take effect immediately — no reload, no file editing, no restart.

---

## What you can edit

**General settings** — the top-level options:

- `mention_limit`
- `vanish_respect`, `afk_respect`, `ignore_respect`
- `prefix`
- `disabled_worlds`

**Per-type settings** — one screen per mention type (player, nearby, everyone, group):

- enabled / disabled
- sound
- colour
- display text
- keyword
- cooldown
- radius (nearby only)

## How text is entered

Anything that is not a toggle or a number uses a **chat prompt**: the GUI closes, you type the value in chat, and the menu reopens with it applied.

This is deliberate — there is no anvil GUI. Anvil-based text input breaks on some server versions in ways that are hard to diagnose, and chat input works on every client with no special handling.

Type the cancel keyword shown in the prompt to abort without changing anything.

## Why edit in game

The GUI is best for the settings you tune by feel — sound, colour, cooldown, radius. Change it, say something in chat, hear the result, adjust. Doing that through a file editor and a reload takes ten times as long.

For structural changes — a big `disabled_groups` list, per-group entries under `group.list` — the file is still easier.

## It writes to the file

Changes made in the GUI are persisted to `config.yml`, comments intact. They are not runtime-only, and they survive a restart.

Consequence worth knowing: if you edit `config.yml` by hand **while** someone has the GUI open, the GUI's next write can overwrite your edit. Do one or the other.

## Next

- [Integrations](/plugins/dmentions/features/integrations/)
