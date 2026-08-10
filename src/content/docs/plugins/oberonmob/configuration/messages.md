---
title: "messages.yml"
description: "Toggle confirmations per toggle or shared, plus the admin command output. MiniMessage throughout."
---

`plugins/OberonMob/messages.yml`. MiniMessage format. Reload with `/oberonmob reload`.

`<prefix>` anywhere is replaced by the `prefix` key at the top.

## Toggle confirmations

Two levels. A toggle uses **its own** message when one exists, and the shared pair otherwise — so a toggle you invent works immediately, and can be given its own wording later.

### Shared fallback

```yaml
toggle:
  enabled: "<gradient:#C21807:#F11800><bold>%toggle%</bold></gradient> <dark_gray>»</dark_gray> <gradient:#55FF55:#4DE64D><bold>Enabled</bold></gradient>"
  disabled: "<gradient:#C21807:#F11800><bold>%toggle%</bold></gradient> <dark_gray>»</dark_gray> <gradient:#FF5555:#E64D4D><bold>Disabled</bold></gradient>"
```

### Per toggle

Keyed by the toggle's config key:

```yaml
toggles:
  mobs:
    enabled: "…<bold>Mob Spawns</bold>… <bold>Enabled</bold>…"
    disabled: "…<bold>Mob Spawns</bold>… <bold>Disabled</bold>…"
  phantoms:
    enabled: "…"
    disabled: "…"
```

Add a `creepers:` block to give a toggle you added its own wording. Leave it out and it uses the shared pair with `%toggle%` filled in.

### Placeholders

| | Is |
|---|---|
| `%toggle%` | the toggle's key, e.g. `mobs` |
| `%command%` | its command name |
| `%radius%` | its radius in blocks |
| `%mode%` | `CANCEL_SPAWN` or `HIDE_ENTITY` |

### Which way round?

**`disabled` means the mobs are off** — the player no longer sees or gets those spawns. That matches what the player asked for, and what the old script showed.

## Command output

```yaml
command:
  usage: [ … ]                      # a list — each entry is one line
  reloaded: "…%toggles% … %restart%"
  status:
    header: "…%count% … %storage%"
    line: "…%toggle% %command% %mode% %radius% %entities% %state% %using%"
    none: "…"
```

`%restart%` is `yes` or `no` — whether toggles were added or removed, which is the one change a reload cannot finish on its own.

On the status line:

| | Is |
|---|---|
| `%entities%` | how many entity types the toggle covers — the number that tells you your group tokens worked |
| `%state%` | `on` or `off` for the player running the command |
| `%using%` | how many online players currently have it off |
| `%storage%` | `database` or `memory` |

## Gradients

The shipped messages use `<gradient:#a:#b>` rather than the per-letter hex codes the old script needed. The result looks the same and is far easier to restyle:

```yaml
    disabled: "<gradient:#C21807:#F11800><bold>Mob Spawns</bold></gradient> <dark_gray>»</dark_gray> <gradient:#FF5555:#E64D4D><bold>Disabled</bold></gradient>"
```

## Action bar

The same key is used for the chat line and the action bar, with `<prefix>` stripped for the action bar. If you want them to differ, turn one channel off under `Feedback` in `config.yml`.

## DzusillCore built-ins

The bottom of the file holds the framework's own messages. Restyle freely; don't rename the keys.

## If a message shows as its key

Seeing `toggle.disabled` in-game means the key is missing. That is deliberate — a missing message is visible rather than silent. Add it back, or delete the file and restart to regenerate it.
