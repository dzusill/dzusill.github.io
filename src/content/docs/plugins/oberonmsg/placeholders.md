---
title: "Placeholders"
description: "PlaceholderAPI placeholders for message acceptance, social spy state and ignore list size."
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/). Without it the plugin works fine — the
placeholders just aren't registered.

The expansion is registered by OberonMSG itself, so there is nothing to download from `/papi ecloud` and it survives
`/papi reload`.

## Available

| Placeholder | Returns |
|---|---|
| `%oberonmsg_messages%` | `on` or `off` — whether this player accepts private messages |
| `%oberonmsg_socialspy%` | `on` or `off` |
| `%oberonmsg_ignored%` | How many players they are ignoring |
| `%oberonmsg_socialspy_users%` | How many online players have social spy on |

All except the last are per-viewing-player.

## Note on `messages`

**`on` means they accept messages.** The stored preference is "messages are off", and the placeholder inverts it —
a placeholder reading `off` when somebody accepts messages would read backwards on every scoreboard using it.

## Examples

Tab list suffix showing who has messages off:

```yaml
suffix: " &7[msg: %oberonmsg_messages%]"
```

Staff scoreboard:

```yaml
- "&fSocial spy: &a%oberonmsg_socialspy%"
- "&fIgnoring: &a%oberonmsg_ignored%"
```

`%oberonmsg_socialspy_users%` is useful on a staff panel — knowing how many people are watching private messages is
worth being able to see.

## Verifying

```
/papi parse me %oberonmsg_messages%
```

If that returns the literal text rather than `on` or `off`, the expansion did not register — check the console at
startup for:

```
[OberonMSG] Registered PlaceholderAPI expansion.
```

No such line means PlaceholderAPI was not installed when OberonMSG started. Install it and restart; the check happens
once, at enable.
