---
title: "Placeholders"
description: "The PlaceholderAPI expansion, registered under the same identifier the Skript version used."
---

Requires **PlaceholderAPI**. Without it the expansion is not registered and one line is written to
console at startup; everything else works.

The expansion is registered by the **Key All** module. Turn that module off and the placeholders go
with it.

| Placeholder | Gives |
|---|---|
| `%oberon_keyall_timer%` | Time until the next drop — `1h 2m 3s` |
| `%oberon_keyall_seconds%` | The same as a raw number of seconds |
| `%oberon_keyall_next%` | The configured odds — `orbital 94%, plasma 5%, andromeda 1%` |

## The identifier is unchanged

`oberon`, exactly as the Skript expansion registered it. Anything already displaying
`%oberon_keyall_timer%` — a scoreboard, a hologram, a tab entry — keeps working with no edit.

Change it if you need to:

```yaml
placeholders:
  identifier: oberon
```

## The format is unchanged too

```yaml
placeholders:
  timer-format:
    hours: "<h>h <m>m <s>s"
    minutes: "<m>m <s>s"
    seconds: "<s>s"
```

Leading units that are zero are dropped: `1h 1m 1s`, then `2m 3s`, then `5s`. Which template is used
depends on how much time is left.

`<h>`, `<m>` and `<s>` are the hours, minutes and seconds. Integer division throughout, so there are
none of the trailing `.0` artefacts a naive calculation produces.

## It survives a PlaceholderAPI reload

The expansion is registered as persistent. This is worth knowing because the failure it avoids used
to be routine: a reloading PlaceholderAPI made every placeholder-based check return its own name,
and anything comparing that text quietly took the wrong branch.

Nothing inside OberonUtils reads its own placeholders — every internal check goes through the real
plugin API instead. The expansion exists only for what you put on screen.
