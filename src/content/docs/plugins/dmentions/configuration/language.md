---
title: "Language Files"
description: "Every message the plugin sends lives in plugins/dMentions/lang/, selected by:"
---

Every message the plugin sends lives in `plugins/dMentions/lang/`, selected by:

```yaml
lang_file: "en-US"
```

`en-US.yml` ships with the plugin. It is the only bundled language.

---

## Adding your own

1. Copy `lang/en-US.yml` to `lang/<your-locale>.yml`.
2. Translate the values — leave the keys alone.
3. Set `lang_file: "<your-locale>"`.
4. `/dm reload`.

Copy rather than rename: a missing `en-US.yml` is regenerated on the next start, and having the original around makes it obvious which keys are new after an update.

## Formatting

Values are [MiniMessage](https://docs.advntr.dev/minimessage/format.html), so colours, gradients, hover text and click events all work:

```yaml
mention_toggled_on: "<green>Mentions enabled. <gray>Turn them off with <click:run_command:/dm toggle><white><u>/dm toggle</u></white></click>."
```

`<prefix>` expands to the `prefix` value from `config.yml`.

## Placeholders

Messages use `{}`-style placeholders. Which ones are available depends on the message — the shipped file shows them in place. Common ones:

| Placeholder | Meaning |
|---|---|
| `{p}` | player name |
| `{group}` | group name |
| `{display}` | a custom display tag |
| `{value}`, `{old_value}` | before/after in customise and admin messages |
| `{target}` | the affected player in admin messages |
| `{commands}` | the subcommand list in `/dm help` |

Keep the placeholders that a message ships with. Removing one does not error; it just produces a message missing the information it was meant to carry.

## Mention text vs plugin messages

Two different places, easy to confuse:

| What | Where |
|---|---|
| How `@Steve` renders in chat | `config.yml` → `player.display`, `color` |
| "Mentions enabled", cooldown warnings, `/dm help` | `lang/<locale>.yml` |

## Updating

New keys added by a plugin update are merged into your language file. Your translations are preserved.

## Next

- [Reloading](/plugins/dmentions/configuration/reloading/)
