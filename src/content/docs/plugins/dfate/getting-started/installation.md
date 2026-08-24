---
title: "Installation"
description: "Order in the folder does not matter — dFate declares depend: [DzusillCore] and softdepend: [dDialogs, PlaceholderAPI, AdvancedBan], so the server enables…"
---

## 1. Drop in the jars

```
plugins/
├── DzusillCore.jar     ← required, 1.12.0 or newer
├── dDialogs.jar        ← optional but recommended
└── dFate.jar
```

Order in the folder does not matter — dFate declares `depend: [DzusillCore]` and `softdepend: [dDialogs, PlaceholderAPI, AdvancedBan]`, so the server enables everything in the right sequence on its own.

## 2. Start the server once

dFate writes four files into `plugins/dFate/`:

| File | What it holds |
|---|---|
| `config.yml` | Every setting. Fully commented. |
| `messages.yml` | Every string a player sees, including the dialog screen. |
| `database.yml` | Optional SQL storage, off by default. |
| `modes.yml` | The stored modes. **Do not hand-edit while the server is running.** |

The console should show:

```
[dFate] Enabling module: Foundation
[dFate] Enabling module: Dialogs
[dFate] Dialogs ready (prompt=paper+legacy)
[dFate] Enabling module: Fate
[dFate] Loaded 0 player modes.
[dFate] Enabling module: Bans
[dFate] Enabling module: Choice
[dFate] Enabling module: Death
[dFate] Enabled successfully.
```

## 3. Point the ban at your ban plugin

This is the one setting you almost certainly need to touch. The shipped default is AdvancedBan syntax:

```yaml
Ban:
  Duration: 24h
  Command: 'tempban %player% %duration% %reason%'
  Unban-Command: 'unban %player%'
```

LiteBans and CMI accept the same shape. If your ban plugin wants something else, write it here — `%player%`, `%uuid%`, `%duration%` and `%reason%` are substituted before dispatch.

dFate checks the command against the live command map before running it. If nothing on the server provides it, you get a loud console error rather than a silent no-op:

```
[dFate] SEVERE: No plugin on this server provides /tempban — check Ban.Command in config.yml.
        Falling back to the server's own ban list.
```

## 4. Verify

Join with a test account. You should be frozen in place with the choice screen in front of you. Pick normal, then check:

```
/fate
```

If you want to test the hardcore path without waiting 24 hours to get back in, set `Ban.Duration: 30s` first.

## Existing players

Everyone without a stored mode is asked — including players who were on the server long before dFate was installed. If you would rather leave your existing playerbase alone and only ask newcomers:

```yaml
Choice:
  Ask-Existing-Players: false
```

They are then filed as normal, silently, and can still opt in later with `/fate choose hardcore`.
