---
title: "Anti-Spam & Caps"
description: "Cooldown, near-duplicate detection, flood window, message length, the caps check and repeated characters — each switchable on its own."
---

Six checks, all independent. Switch any of them off and the rest keep working.

Anti-spam applies to **chat only** — a rate limit on a sign or an anvil rename would mean nothing. The caps check applies everywhere. Repeated characters apply to chat and commands.

## Cooldown

A minimum gap between two messages.

```yaml
Spam:
  Cooldown:
    Enabled: true
    Seconds: 2.0
    Weight: 1
```

The player is told how long is left, rounded up — "0 seconds to go" is never shown to somebody who has to wait.

> A **blocked** message does not push the cooldown forward. If it did, a fast enough spammer would keep extending their own wait and never be let through — which punishes them by accident, but also makes the remaining-time message nonsense.

## Duplicate

Blocks saying the same thing again, including with a letter changed.

```yaml
  Duplicate:
    Enabled: true
    Similarity-Percent: 90
    Window-Seconds: 30
    History-Size: 3
    Weight: 1
```

Similarity is a real comparison, not string equality: `buying diamonds cheap` and `buying diamonds cheaq` score about 95%, so the classic "change one letter and paste again" trick is caught at the default of 90.

- **100** means only exact copies.
- **Lower** catches more near-repeats — and eventually catches somebody legitimately answering "yes" twice. 85–95 is the useful range.
- `History-Size` is how many recent messages each player is compared against.

## Flood

Caps how many messages fit in a sliding window.

```yaml
  Flood:
    Enabled: true
    Max-Messages: 5
    Window-Seconds: 5
    Weight: 2
```

Five messages in five seconds is generous for conversation and tight for a bot. Only accepted messages count towards the window.

## Length

```yaml
  Length:
    Enabled: true
    Max-Characters: 256
    Weight: 1
```

Vanilla chat allows 256 characters, so the default blocks nothing on its own — it is there for servers that let players send longer messages through another plugin.

## Caps

```yaml
Caps:
  Enabled: true
  Threshold-Percent: 50
  Minimum-Length: 6
  Ignore-Player-Names: true
  Action: BLOCK
  Weight: 1
```

The share of **letters** that are upper case. Digits and punctuation are not counted, so `HELLO!!! 123` is judged on `HELLO` alone.

- `Minimum-Length` keeps `OK` and `GG` legal.
- The threshold is the **highest allowed** value: at 50, a message that is exactly 50% caps passes and 51% does not.

### Player names are excluded

`Ignore-Player-Names: true` skips any word that is the name of an online player. On a server with `XxDARKLORDxX`, everybody who says hello to them would otherwise be shouting.

The old Skript version did this by looping over every online player for every message. Here each word is looked up once instead, so the cost does not grow with the player count.

### Three actions

| `Action` | What happens |
|---|---|
| `BLOCK` | message is never sent |
| `LOWERCASE` | message is sent in lower case |
| `WARN` | message is sent as typed, the player is asked to stop |

`LOWERCASE` keeps the conversation flowing while taking the shouting out of it, and tends to annoy people less than an outright block.

## Repeated characters

`Hiiiiiii`, `!!!!!!!`, the same emoji six times. At most five of one character may stand in a row; the sixth is a hit.

```yaml
Repeated-Characters:
  Enabled: true
  Max-Repeats: 5
  Ignore-Digits: true
  Ignore-Characters: ""
  Ignore-Player-Names: true
  Ignore-Urls: true
  Action: BLOCK
  Alert-Staff: false
  Record-Violation: false
  Weight: 1
  Sources:
    Chat: true
    Commands: true
    Signs: false
    Books: false
    Anvil: false
```

| Message | Result |
|---|---|
| `Hiiiii` | passes — five is the most allowed |
| `Hiiiiii` | blocked |
| `HiIiIiI` | blocked — upper and lower case are the same letter |
| `!!!!!!`, `??????`, 😂😂😂😂😂😂 | blocked — punctuation, symbols and emoji count too |
| `1000000` | passes — digits never count, and they end a run |
| `a a a a a a` | passes — a space ends a run |
| `Hi&ai&ai&ai&ai&ai` | blocked — colour codes are read out first, and every player sees `Hiiiiii` |

### What it leaves alone

- **Digits.** A price like `1000000` is not spam. `Ignore-Digits: false` counts them like anything else.
- **Player names.** A word that is an online player's name is skipped, with or without an `@` or a comma around it — somebody is bound to be called `xXxXxXx`.
- **Links.** A word starting `http://`, `https://` or `www.` is skipped. One that merely *contains* `www.` is not a link: `awwwwwww.` is still a hit.
- **Characters you list.** `Ignore-Characters: ".=-"` allows `......` and `======`. Keep the quotes. A listed character never counts and still ends a run, so `aaa.aaa` is two runs of three.
- **The censor character.** A long word the filter starred out is a run of `*` the player never typed, so it is never taken for spam.

Invisible characters — zero-width spaces, joiners, skin-tone modifiers — are passed over *without* ending a run. Otherwise one zero-width space between every letter would hide any stretch while looking exactly the same in chat.

### Three actions

| `Action` | What happens |
|---|---|
| `BLOCK` | message is never sent |
| `COLLAPSE` | every run is cut down to `Max-Repeats` and the message is sent — `Hiiiiiiii` arrives as `Hiiiii` |
| `WARN` | message is sent as typed, the player is asked to stop |

### Spam, not abuse

By default a stretched message is stopped and the player is told why — and that is all. **No staff alert and nothing recorded**: no entry in `/oberonchat history`, no points towards a punishment. `Alert-Staff` and `Record-Violation` switch either one on; `Weight` only counts with `Record-Violation`.

A stretch never cancels anything else in the same message. `darn itttttttt`, with `darn` set to `WARN`, is blocked for the stretch — and staff still hear about `darn`, under `word:darn` rather than the stretch.

### Where it applies

Chat and commands. Signs, books and anvils are off because people decorate them with `======` and `------` on purpose.

`Commands` means the commands listed under `Sources.Commands`, and a source switched off at the top of the file is never read at all, whatever `Repeated-Characters.Sources` says. Unlike the top-level `Sources`, these apply on `/oberonchat reload`.

> It runs **before** the anti-spam checks. Those remember every message they let through, so a block that came afterwards would still start the cooldown — and the corrected `Hi` would be refused for coming too soon.

## Bypass permissions

| Node | Skips |
|---|---|
| `oberonchat.bypass.spam` | cooldown, flood and duplicate |
| `oberonchat.bypass.length` | the length limit |
| `oberonchat.bypass.caps` | the caps check |
| `oberonchat.bypass.repeat` | the repeated-characters check |
| `oberonchat.bypass.filter` | the word filter |

A bypassed check **never runs** — it is not merely ignored on the way out. Staff with a spam bypass never see a wait, and their messages still land in the history the other checks read.

## One complaint per message

If a message trips more than one check and still goes through, the player is told about the **first** one only — word filter, then caps, then repeated characters. Two complaints about one message reads like a malfunction. If one of them stops the message, that is the one they hear about: it is why nothing was sent.

Both weights still count towards the violation total.
