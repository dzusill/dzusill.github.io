---
title: "config.yml"
description: "The main settings file. Every key has a working default, so the plugin runs on first start and is"
---

The main settings file. Every key has a working default, so the plugin runs on first start and is
tuned from there. Everything is re-read by `/afk reload` except the `commands` block.

## game-modes

A list. Only players in these game modes collect time in a zone. Anyone else in a zone gets no
countdown, and switching to one of them starts the timer from zero.

```yaml
game-modes: [ SURVIVAL, ADVENTURE ]
```

An empty or unreadable list falls back to `SURVIVAL` and `ADVENTURE`.

## delivery and storage

| Key | Default | Meaning |
|---|---|---|
| `delivery.physical-items` | `DIRECT` | `DIRECT`: items go to the inventory, the overflow to the claim storage. `STORAGE`: always the storage |
| `storage.max-stacks` | `54` | Most stacks one player can have waiting. `0` is unlimited |

Command rewards ignore `delivery.physical-items` — they always run at once. See
[Delivery and the claim storage](/plugins/oberonafk/features/delivery-and-storage/).

## countdown

| Key | Default | Meaning |
|---|---|---|
| `countdown.enabled` | `true` | The live `Next AFK reward in …` line on the action bar |
| `countdown.hold-seconds` | `4` | How long the countdown waits after another action-bar message |

A zone can switch the countdown off for itself with `countdown: false` in
[`zones.yml`](/plugins/oberonafk/configuration/zones/).

## teleport

| Key | Default | Meaning |
|---|---|---|
| `teleport.enabled` | `true` | Off: `/afk` only says teleporting is turned off |
| `teleport.warmup-seconds` | `3` | Time the player must stand still. `0` is instant |
| `teleport.cancel-on-move` | `true` | Moving to another block cancels the warm-up |
| `teleport.cancel-on-damage` | `true` | Taking damage cancels it |
| `teleport.block-in-combat` | `true` | Refuse while PvPManager has the player combat-tagged |
| `teleport.combat-fallback-seconds` | `15` | Only used when PvPManager's API and PlaceholderAPI both cannot answer: how long an observed tag counts |

See [The /afk teleport](/plugins/oberonafk/features/teleport/).

## notifications

What each zone event shows. Every event has `chat`, `action-bar`, `title` (booleans) and `sound` (an
alias from [`sounds.yml`](/plugins/oberonafk/configuration/sounds/), `""` for silence). The texts are in
[`messages.yml`](/plugins/oberonafk/configuration/messages/#notice).

| Event | Defaults |
|---|---|
| `enter` | chat, action bar · sound `enter` |
| `leave` | chat · sound `leave` |
| `reward` | chat, action bar · sound `reward` |
| `storage` | chat · sound `storage` |
| `storage-full` | chat · sound `error` |
| `nothing` | nothing, silent |
| `teleport` | chat · sound `teleport` |
| `alt-blocked` | chat · sound `error` — another of the player's accounts already collects |
| `alt-unblocked` | chat · sound `enter` — that account stopped, this one collects now |

`notifications.title-times` sets the default `fade-in`, `stay` and `fade-out` for every title, in ticks
(20 is one second).

## history

| Key | Default | Meaning |
|---|---|---|
| `history.page-size` | `10` | Lines per page of `/afk history` (1-50) |

## alt-guard

Of accounts that connect from the same address, now or within `remember`, only `max-accounts` collect.
How it decides, what it stores and what it cannot catch:
[One account per player](/plugins/oberonafk/features/alt-guard/).

| Key | Default | Meaning |
|---|---|---|
| `alt-guard.enabled` | `true` | Off: every account collects |
| `alt-guard.max-accounts` | `1` | How many linked accounts collect at once |
| `alt-guard.ignore-addresses` | loopback and private networks | Addresses or CIDR ranges that link nobody |
| `alt-guard.remember` | `30d` | How long a shared address keeps accounts linked. `0` stores nothing |
| `alt-guard.staff-alert.enabled` | `true` | Tell players with `oberonafk.altguard.notify` when an account is held back |
| `alt-guard.staff-alert.cooldown` | `5m` | Alerts about one account wait this long |
| `alt-guard.staff-alert.console` | `true` | Also write the alert to the console |

## time-format

How every time players read is written — countdown and durations, in templates or units. Seconds are
shown by default. Full description and examples:
[Notifications and formatting](/plugins/oberonafk/features/notifications/#time-formatting).

## leaderboard

See [Leaderboard](/plugins/oberonafk/features/leaderboard/) for how it behaves.

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Off: every board is empty and `/afk top` says so |
| `refresh-seconds` | `60` | How often the snapshot is rebuilt (at least 5) |
| `max-position` | `100` | Highest rank a placeholder may ask for |
| `page-size` | `10` | Rows per page of the `page_` placeholders and `/afk top` |
| `list-separator` | `"\n"` | Joins rows in `top_list` / `page_list` |
| `list-max` | `100` | Cap on rows in one list placeholder |
| `min-value` | `0` | At or below this a value is nothing and never ranked (seconds for `time`) |
| `blank-text` | `""` | What nothing renders as |
| `hide-zero-value` | `false` | Whether a player's own zero blanks too |
| `unranked-position` | `""` | What `position_` shows for somebody not on the board |
| `exempt-permission` | `oberonafk.top.exempt` | Holders are left out of every board. `""` ranks everybody |
| `exempt-players` | empty | Names or UUIDs also left out |
| `line-format` | `<gray>#%pos% <white>%name% <dark_gray>- <gold>%value%` | Behind `top_line` / `page_line`: `%pos%` `%ordinal%` `%name%` `%value%` `%value_short%` `%value_raw%` `%uuid%` `%track%` |
| `ordinal.one/two/three/default` | `st` `nd` `rd` `th` | Suffixes; `11th`–`13th` are handled |
| `track-names.time/drops/drops-reward` | `AFK time`, `AFK rewards`, `{reward}` | How tracks are named; `{reward}` is the reward's display text |

The leaderboard's extra time formats (`long`, `short`, `clock`) are styles under `time-format`.

## commands

Read once at startup; changing anything here needs a restart.

```yaml
commands:
  main:
    name: afk
    aliases: [ ]
    take-over: true
  claim:
    name: afkrewards
    aliases: [ afkclaim ]
    take-over: false
```

| Key | Meaning |
|---|---|
| `main` | The command that **teleports** when typed bare. `/afk` by default |
| `claim` | The command that **opens the claim storage** when typed bare |
| `name` / `aliases` | Any label, lower-case, no slash |
| `take-over` | Answer the name even when another plugin registered it first |

Both roots take the same subcommands, so `/afk claim`, `/afk rewards` and `/afkrewards stats` all work.
`take-over` on `main` is why `/afk` beats EssentialsX's own — see
[Taking over /afk](/plugins/oberonafk/features/teleport/#taking-over-afk).

## Presentation

Where every message in [`messages.yml`](/plugins/oberonafk/configuration/messages/) goes (chat, action bar, both, none) and what it
sounds like, by category or per key.

| Category | Covers |
|---|---|
| `ERROR` | Every refusal and failure: no permission, wrong usage, player not found, in combat, cancelled, inventory full, unknown zone … |
| `TELEPORT` | The `/afk` warm-up countdown |
| `INFO` | Everything else: successes, lists, help, stats |

`Overrides` names a single key, written nested the way it is nested in `messages.yml`, and beats its
category. `Overrides` is an owner-curated section: an entry you delete is never merged back.

## titles

A title and subtitle for any message key, shown on top of wherever `Presentation` sends the message
itself. Also owner-curated. See
[Notifications and formatting](/plugins/oberonafk/features/notifications/#titles-for-any-message).
