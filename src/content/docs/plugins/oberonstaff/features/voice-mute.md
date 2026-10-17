---
title: "Voice Mutes"
description: "/vcmute, /vcunmute and /vccheck for Simple Voice Chat — temporary or permanent, -s for silent, worded and permissioned like LiteBans."
---

New in **1.9.0**. Mutes a player's microphone in **Simple Voice Chat** — proximity chat, groups and whispers alike — with commands, wording and permissions modelled on LiteBans, so a voice mute reads like every other punishment on the server.

## Why it exists

Simple Voice Chat has no mute command and no temporary punishments. The usual workaround — a LuckPerms `settemp` on `voicechat.speak` — works, but it gives staff no broadcast, no `-s`, no reason and no history. Nobody can answer "why can't Steve talk, and since when" without reading the permissions plugin.

## What it needs

| | |
|---|---|
| **Simple Voice Chat** | plugin name `voicechat`, tested against the 2.6.x API |
| **The database** | `database.yml` — embedded H2 by default, nothing to install |

Without either, the commands are **still registered** and say which one is missing, rather than vanishing and leaving staff to wonder whether they typed it wrong. The console says it once at startup:

```
[OberonStaff] Simple Voice Chat is not installed — /vcmute, /vcunmute and /vccheck will say so.
```

## The commands

| Command | Who |
|---|---|
| `/vcmute [-s] <player> [duration] [reason]` | `oberonstaff.vcmute` (any length) or `oberonstaff.vcmute.temp` (with a duration) |
| `/vcunmute [-s] <player> [reason]` | `oberonstaff.vcunmute` |
| `/vccheck <player>` | `oberonstaff.vccheck` |

Read the LiteBans way:

- **No duration is permanent.** `/vcmute Steve spamming` mutes Steve for good, for "spamming".
- **Durations:** `30s` `10m` `12h` `1d` `2w` `1mo` `1y`, or combined: `1d12h`. A month is 30 days, a year 365.
- The word after the player is a duration only if it **starts with a digit**. `/vcmute Steve 30x` is refused as a bad duration instead of quietly becoming a permanent mute with the reason "30x".
- **`-s` can go anywhere** — `/vcmute -s Steve 1d`, `/vcmute Steve 1d spam -s`. It is never part of the reason.
- No reason → `Voice-Mute.Default-Reason` (`N/A`).
- Works on **offline players** who have joined before — looked up in the server's name cache, never Mojang.
- Names complete like `/tp`: `/vcmute ste` finds Steve if he is the only match online.

Tab completion offers online players (vanish-aware), then common durations (`30` → `30m 30h 30d …`), and `-s` only to those who may use it.

```
/vcmute Steve 1d shouting over everyone
/vcmute -s Griefer123
/vcunmute Steve appealed
/vccheck Steve
```

## What happens

- A **public** mute is announced to everyone (`Broadcast-To: ALL`, as LiteBans does) or only to holders of `oberonstaff.vcmute.notify` (`Broadcast-To: NOTIFY`).
- A **silent** mute (`-s`) sends the same line behind `Silent » `, only to holders of `oberonstaff.vcmute.notify.silent`.
- The staff member who did it and the console **always** see the line.
- The muted player, if online, is told by whom, for how long and why.
- While muted, every microphone packet they send is dropped. When they try to talk they get a reminder above the hotbar, at most every `Notice.Interval-Seconds`:

```
You are voice muted. (2 days 3 hours remaining)
```

A temporary mute ends on its own the moment its time passes — checked on every packet, at join and in every command, with no background job. Mutes **survive restarts**.

### An existing mute is not overwritten

`/vcmute` on somebody already muted says so, and names who did it:

```
Steve is already voice muted (2 days left, by Alice).
```

Holders of `oberonstaff.vcmute.override` replace it instead. The old one is kept in the history as lifted, reason `Replaced` — so the record of the first mute does not disappear because a second staff member disagreed with its length.

## `/vccheck`

Shows whether the player is muted right now, and their last `Voice-Mute.History-Lines` mutes, newest first:

```
Voice mute » Steve
» Muted by Alice for shouting over everyone, 23 hours left (until 2026-10-18 14:02)
» Last 3:
   #12 2026-10-17 14:02 | Alice | 1 day | shouting over everyone | active
   #9  2026-10-10 20:15 | Bob | 1 hour | mic spam | expired
   #4  2026-10-02 18:40 | Alice | permanent | N/A | lifted by Bob (appealed)
```

Each entry is **active**, **expired**, or **lifted** — and a lifted one says by whom and why.

## Permissions

All `default: op`, all children of `oberonstaff.*`.

| Node | Lets you |
|---|---|
| `oberonstaff.vcmute` | Mute permanently or for any length. Includes `.temp`. |
| `oberonstaff.vcmute.temp` | Mute with a duration only, at most `Temp-Max-Duration`. The command's own node. |
| `oberonstaff.vcunmute` | `/vcunmute` |
| `oberonstaff.vcmute.silent` | Use `-s` on `/vcmute` and `/vcunmute` |
| `oberonstaff.vcmute.notify` | Hear public mutes when `Broadcast-To: NOTIFY` |
| `oberonstaff.vcmute.notify.silent` | Hear `-s` mutes and unmutes |
| `oberonstaff.vcmute.exempt` | Not be muted |
| `oberonstaff.vcmute.override` | Replace a mute that is already in force |
| `oberonstaff.vccheck` | `/vccheck` |

`oberonstaff.vcmute.exempt` is checked **while the player is online** — permissions cannot be read for somebody who is not. The console ignores it.

### A trial rank

Short cooldowns, but no permanent mutes:

```
/lp group trial permission set oberonstaff.vcmute.temp true
```

```yaml
Voice-Mute:
  Temp-Max-Duration: "1h"
```

A trial moderator who leaves the duration off is told they can only mute for a limited time; one who asks for `1d` is told the cap. Holders of `oberonstaff.vcmute` are never limited.

## config.yml

```yaml
Voice-Mute:
  Enabled: true                 # false: no commands, no voice chat hook
  Default-Reason: "N/A"
  Temp-Max-Duration: "0"        # cap for .temp-only staff, e.g. "1d"; "0" = none
  Broadcast-To: ALL             # ALL | NOTIFY
  Notice:
    Action-Bar: true            # false = chat
    Interval-Seconds: 5         # -1 = never remind
  History-Lines: 5              # /vccheck; 0 hides the history
  Date-Format: "yyyy-MM-dd HH:mm"
```

The three commands also get entries under `Commands` (`vcmute`, `vcunmute`, `vccheck`) — rename, alias or switch them off like any other. Everything is added to an existing config on update. See [config.yml → Voice-Mute](/plugins/oberonstaff/configuration/config/#voice-mute).

Reloaded by `/oberonstaff reload`, **except** `Enabled` and the command names, which need a restart.

## Messages

Everything a player or staff member reads is under `voice-mute` in `messages.yml` — see [messages.yml → Voice mutes](/plugins/oberonstaff/configuration/messages/#voice-mutes).

## Action log

Every mute and unmute goes into the [action log](/plugins/oberonstaff/features/action-log/), readable with `/oberonstaff log`:

| Action | Was |
|---|---|
| `vcmute 1d` | a temporary mute, with its length |
| `vcmute` | a permanent mute |
| `vcunmute` | a mute lifted |

A mute aimed at somebody who already left has no place to record, so the entry shows world `-` and zero coordinates.

## Storage

Table `oberonstaff_voice_mutes`, created automatically in H2, MySQL or PostgreSQL. Rows are **never deleted**: an unmute or a replacement sets `active = false` with `removed_by`, `removed_reason` and `removed_at`. `expires_at` is `NULL` for a permanent mute.

On a network sharing one database, every server running OberonStaff reads the same mutes — each one picks a player's mute up when that player joins it.

## How it works

- Voice chat is detected through Bukkit's plugin manager **before** any class that names a voice chat type is touched. Without Simple Voice Chat, OberonStaff loads normally.
- Enforcement is a voice chat addon that drops `MicrophonePacketEvent` from muted speakers. That event fires on voice chat's **network thread**, so the decision reads an in-memory copy of the mutes in force — never the database, never the Bukkit API. The reminder is handed to the server thread.
- The copy is filled at startup, refreshed per player on join, and updated after every successful write. Commands write asynchronously and answer on the server thread.
- Simple Voice Chat cannot unregister an addon. When OberonStaff is disabled the gate opens and lets every packet through, rather than enforcing mutes for a plugin that is no longer running.

## Troubleshooting

**"Simple Voice Chat is not installed"** — the plugin is missing, or failed to enable. `voicechat` must load before OberonStaff; it is a `softdepend`, so that happens on its own when both are in `plugins/`.

**"Voice mutes need the database"** — `enabled: false` in `database.yml`. Turn it on, or set `Voice-Mute.Enabled: false` to silence the warning.

**A muted player can still be heard** — check `/vccheck`: a temporary mute may simply have run out. If it says muted and they are still heard, make sure Simple Voice Chat is the version the server actually loaded (`/plugins`) and that OberonStaff enabled after it.
