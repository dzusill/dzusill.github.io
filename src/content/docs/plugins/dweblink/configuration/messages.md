---
title: "messages.yml"
description: "Every line the plugin sends. All values are MiniMessage, so colours, gradients, hover text and click events all work."
---

Every line the plugin sends. All values are [MiniMessage](https://docs.advntr.dev/minimessage/format.html), so colours, gradients, hover text and click events all work.

---

## Prefix and shared lines

```yaml
prefix: "<gradient:#00d0ff:#8b5cf6><bold>WebLink</bold></gradient> <dark_gray>»</dark_gray> "
no-permission: "<prefix><red>You don't have permission to do that."
players-only: "<prefix><red>Only players can use this command."
unknown-command: "<prefix><red>Unknown command."
invalid-usage: "<prefix><red>Usage: <yellow>%usage%</yellow>"
player-not-found: "<prefix><red>Player not found."
```

`<prefix>` expands to the `prefix` key wherever it appears. Set `prefix: ""` to strip branding everywhere at once.

---

## Sections

| Section | Covers |
|---|---|
| `api` | shared failure reasons: `not-configured`, `bad-response`, `connection-failed`, `interrupted`, `unknown` |
| `verify` | `/verify` — usage, checking, success, wrong, blocked, expired, error, not_configured |
| `verifyemail` | `/verifyemail` — as above, plus `not_found` and `email_in_use` |
| `linkdiscord` | `/linkdiscord` — generating, success, cached, cooldown, already_linked, error |
| `discordunlink` | `/discordunlink` — confirm, success, cancelled, not_linked, admin_blocked, cooldown, error |
| `dweblink` | `/dweblink reload` — usage, reloaded, reload-failed |

The `api.*` values are fragments, not full lines: they are substituted into `%error%` inside the command messages. That is why *"Could not generate a code: couldn't reach the website."* reads as one sentence.

---

## Placeholders

| Placeholder | Available in |
|---|---|
| `%attempts%` | `verify.wrong`, `verifyemail.wrong` |
| `%minutes%` | `verify.blocked`, `verifyemail.blocked` |
| `%seconds%` | `linkdiscord.cooldown`, `discordunlink.cooldown` |
| `%error%` | any `*.error` line |
| `%usage%` | `invalid-usage` |
| `%input%` | `invalid-number` |

---

## Multi-line messages

Any key may be a **list** instead of a string, and each entry renders as its own line:

```yaml
verify:
  success:
    - "<prefix><green>Your account is linked!"
    - "<gray>Head back to the website — you're signed in."
```

This is how the shipped defaults render the success screens for `/verify`, `/linkdiscord` and `/discordunlink`.

## Making a line clickable

```yaml
linkdiscord:
  success:
    - "<prefix><green>Your code: <click:copy_to_clipboard:%code%><white><u>%code%</u></white></click>"
    - "<gray>Click it to copy, then paste it to the bot."
```

## Next

- [Reloading](/plugins/dweblink/configuration/reloading/)
