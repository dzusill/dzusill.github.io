---
title: "messages.yml"
description: "Every line the plugin sends. Nothing is hardcoded, so the desk can speak in your server's voice —"
---

Every line the plugin sends. Nothing is hardcoded, so the desk can speak in your server's voice —
or in another language entirely.

## MiniMessage

Messages are written in MiniMessage, the same format the rest of the catalogue uses:

```yaml
Ticket-Created: "<green>Ticket <white>#%ticket%</white> created."
```

Colours, gradients, hover text and click actions all work. Hex colours use `<#RRGGBB>`.

## Placeholders

Each message gets the placeholders that make sense for its context — `%ticket%` for a ticket number,
`%player%` for a name, `%category%`, `%priority%`, `%status%`. The shipped file shows which are
available on each line; a placeholder a message does not receive renders as itself, so it is obvious
when you have used the wrong one.

PlaceholderAPI placeholders also resolve inside messages when it is installed.

## A message that must stay quotable

Beware of YAML's own rules rather than the plugin's:

- A value starting with `%` or `<` **must be quoted**, or the parser reads it as something else.
- A bare `on:` or `off:` used as a **key** parses as a boolean, not a string. Quote such keys.
- A tab character anywhere in the file will break the parse. Editors that insert tabs on blank lines
  are the usual culprit — the framework repairs the common case, but do not rely on it.

If a whole section of messages goes silent after an edit, this is almost always why. `/dtickets
status` reports a config that failed to parse rather than failing quietly.

## Silencing a line

Set it to an empty string:

```yaml
Ticket-Created: ""
```

The plugin sends nothing rather than an empty message.

## After editing

```
/dtickets reload
```

Takes effect immediately, including for players already online.
