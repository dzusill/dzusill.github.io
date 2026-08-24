---
title: "Dialogs & Fallback"
description: "dFate never talks to dDialogs directly. It builds a DialogSpec — a plain description of a screen — and hands it to DzusillCore's DialogService, which…"
---

dFate never talks to dDialogs directly. It builds a `DialogSpec` — a plain description of a screen — and hands it to DzusillCore's `DialogService`, which decides how to render it.

```
dFate                    DzusillCore                    dDialogs
  DialogSpec  ──────────► DialogService ──── spec ────►  native dialog
  (title, body,           │                              (1.21.6+ client)
   two buttons)           │
                          └─ no backend, or old client
                             └─ chat fallback: a clickable yes/no prompt
```

The call site is the same either way. There is no version gate to configure and no branch in the plugin: whether a native dialog is possible is decided per call, per player.

## What each player gets

| Situation | Result |
|---|---|
| dDialogs installed, client 1.21.6+ | The native dialog screen. |
| dDialogs installed, client older (incl. via a proxy) | Chat fallback. Detected through ViaVersion when present. |
| dDialogs not installed | Chat fallback, for everyone. |

The chat fallback prints the title and body as chat lines and offers two clickable options. It is a worse screen but a working one, and the same handler runs at the end of it — so the mode is stored identically.

## Why the choice screen is a confirmation

This is the one design decision worth knowing about, because it looks wrong at first glance.

A two-option pick is the obvious use for a `multi_action` dialog. But DzusillCore's chat fallback only renders `notice` and `confirmation` — it **declines** a `multi_action` rather than approximating it, because a chest GUI cannot represent a text field or a slider and pretending otherwise is worse than declining.

A declined dialog returns no handle. And since the player is locked until they answer, a declined dialog means a player locked with no way to answer — permanently, on any client older than 1.21.6.

So the choice is modelled as a **confirmation**: yes is hardcore, no is normal. It is the only shape that survives both paths.

## Forcing the fallback

DzusillCore can be told to serve every dialog as chat, which is useful for testing what your older players see:

```yaml
# plugins/DzusillCore/config.yml
dialogs:
  force-fallback: true
```

## Where the text lives

All of it in dFate's `messages.yml` — the title, the body, both button labels and both hover tooltips. Dialog text is MiniMessage, same as every chat message, so strings move between the two renderings unchanged.

Two rules for the dialog keys:

- **No `<prefix>`.** A dialog has no chat line to prefix.
- **Use `<newline>` for line breaks.** The body is one string; `<newline>` is a standard MiniMessage tag and works in both the native screen and the chat fallback.

See [messages.yml](/plugins/dfate/configuration/messages/) for the full key list.
