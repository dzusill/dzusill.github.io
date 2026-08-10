---
title: "What Gets Checked"
description: "Chat, command arguments, signs, books and anvil renames — why filtering chat alone is not enough, and how OberonChat sits alongside your existing chat plugin."
---

A word filter that only watches public chat is bypassed by typing `/msg` first. OberonChat reads five inputs, each switchable in `config.yml` under `Sources`.

| Source | What it reads | Blocking means |
|---|---|---|
| **Chat** | public chat | the message is never sent |
| **Commands** | arguments of listed commands | the command never runs |
| **Signs** | each line, as it is placed | the sign is not placed |
| **Books** | title and every page | the edit is refused |
| **Anvil** | the rename box | the result slot stays empty |

> These switches decide which listeners are **registered**, and that happens at startup. Changing them needs a restart, not a reload. The upside is that a source you turned off costs nothing at all — not even an event call.

## Chat, and your existing chat plugin

**OberonChat never formats anything.** It only says yes, no, or "use this text instead". Whatever plugin decides how your chat looks keeps doing that.

To make sure the censored version is what gets formatted, OberonChat runs at the **lowest** event priority — before everyone else. If your chat plugin still shows the uncensored text, it is almost certainly reading the message at a priority lower than that, which is unusual; open an issue and say which plugin.

If chat filtering seems to do nothing at all, your chat plugin may be firing only the old-style chat event. Set:

```yaml
Chat-Event: LEGACY
```

`AUTO` (the default) picks the modern event on Paper and the legacy one elsewhere. Only one is ever listened to, so nothing is ever checked twice.

## Commands

```yaml
Sources:
  Commands:
    Enabled: true
    List:
      - msg
      - r
      - me
      - nick
    Check-Unlisted: false
```

Only the listed commands are read. `/plugin:msg` is caught too — the namespaced form is not a way past the list.

> **Leave `Check-Unlisted` off.** Turning it on reads the arguments of *every* command on the server, which includes `/login` and `/register` — and those arguments are passwords. If you want broad coverage, add commands to the list instead.

## Signs

Each line is checked on its own. That is what lets a censor verdict rewrite just that line.

The trade-off: a word deliberately split across two lines is not caught. Catching it would mean checking the joined text as well, and every sign that tripped both passes would count twice against its author.

## Books

Title and every page. A book is the one place on a server where a player can write a wall of text and hand it to somebody, so leaving it out would make the rest of the filter easy to work around.

## Anvils

The rename box fires an event on **every keystroke**. Consequences are therefore debounced: only the first sighting of a given text warns the player, alerts staff and counts as a violation; the keystrokes after that are checked silently. Without that, one rude rename would deliver a dozen warnings and mute the player on the spot.

Blocking clears the result slot, so the rename simply does not happen.

## Anti-spam is chat only

Cooldown, flood and duplicate detection apply to **chat only**. A rate limit on sign text or an anvil rename would mean nothing.

The word filter and the caps check apply everywhere.
