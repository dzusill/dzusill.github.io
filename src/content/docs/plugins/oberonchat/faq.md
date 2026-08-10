---
title: "FAQ & Troubleshooting"
description: "The filter flags innocent words, players get through anyway, alerts don't arrive — the usual causes and the setting that fixes each one."
---

## The filter flags an innocent word

Add the real word to `Whitelist` in `filter.yml` and reload. That is what it is for.

If it keeps happening across many words, the rule causing it is probably short and set to `CONTAINS` or `WORD`. Either give that rule `match: LITERAL`, or raise `Word-Filter.Minimum-Contains-Length` so short rules default to literal matching.

Use `/oberonchat check <phrase>` to confirm the fix without asking a player to test it.

## A player got a banned word through

Work out which layer missed it:

```
/oberonchat check <exactly what they typed>
```

**Reports "Clean"** — the word list does not cover that spelling. If they spread it across spaces (`f u c k`), that rule needs `match: CONTAINS`. If they used characters the normaliser doesn't fold, check `Word-Filter.Normalization` is all `true`.

**Reports a hit** — the filter would have caught it, so the message did not reach the filter. Either they used a source you have switched off in `Sources`, or they hold `oberonchat.bypass.filter`. Check with:

```
/lp user <player> permission check oberonchat.bypass.filter
```

## Chat filtering does nothing at all

Your chat plugin is probably firing only the deprecated chat event. Set:

```yaml
Chat-Event: LEGACY
```

and restart. `AUTO` picks the modern event on Paper, and if your chat plugin never fires that one, nothing is ever checked.

## The censored message shows uncensored

OberonChat rewrites the message at the **lowest** event priority, before other plugins see it. A chat plugin that reads the message even earlier, or that rebuilds it from its own copy, will show the original. Tell us which plugin and we will look at it.

## Staff aren't getting alerts

Three things, in order:

1. `Staff-Alerts.Enabled: true` in `config.yml`.
2. The action is in `On-Actions`. `WARN` is deliberately not in the default list.
3. Staff actually hold `oberonchat.alerts` — it is `op` by default, which is not the same as your mod group.

## Punishments aren't running

- `Violations.Enabled: true`.
- The word's `weight` is above `0`. A `weight: 0` entry is tracked and alerted but never escalates — that is what the shipped `idiot` and `moron` entries do.
- The command in `Commands` works when you type it in the console yourself. OberonChat dispatches it as-is; if your punishment plugin wants different syntax, that is the syntax to put there.
- The threshold has not already fired inside this window. It fires once per window, not once per message.

## A player got punished twice for one message

They shouldn't have. Each rule counts once per message however many times it fired, and a threshold fires once per window. If you can reproduce it, please report it with the message and the config.

## History is empty

`Violations.Persist: true` in `config.yml` **and** `enabled: true` in `database.yml`. Either one off means nothing is written.

## Can I use it without the database?

Yes. Set `enabled: false` in `database.yml`. Violation totals then live in memory and reset on restart, and history is limited to the current decay window. Everything else works identically.

## Does it replace my chat plugin?

No, and it is not meant to. OberonChat never formats anything — it only says yes, no, or "use this text instead". Keep whatever you use for chat formatting.

## Does the anvil check spam my staff?

No. The anvil rename box fires an event on every keystroke, so consequences are debounced: only the first sighting of a given text warns the player, alerts staff and counts. The rest are checked silently.

## Sign text split across two lines isn't caught

Correct, and deliberate. Each line is checked on its own, which is what lets a censor verdict rewrite just that line. Checking the joined text as well would make every sign that tripped both passes count twice against its author.

## Does it work on Folia?

Yes, `folia-supported: true`.

## Where do I report a problem?

[github.com/dzusill](https://github.com/dzusill). Please include:

- Server software and version (`/version`)
- OberonChat and DzusillCore versions
- The output of `/oberonchat check <the phrase>`
- The relevant part of `filter.yml` and `config.yml`
