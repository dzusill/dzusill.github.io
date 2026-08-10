---
title: "Anti-Spam & Caps"
description: "Cooldown, near-duplicate detection, flood window, message length and the caps check — each switchable on its own, each with its own weight."
---

Five checks, all independent. Switch any of them off and the rest keep working.

Anti-spam applies to **chat only** — a rate limit on a sign or an anvil rename would mean nothing. The caps check applies everywhere.

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

## Bypass permissions

| Node | Skips |
|---|---|
| `oberonchat.bypass.spam` | cooldown, flood and duplicate |
| `oberonchat.bypass.length` | the length limit |
| `oberonchat.bypass.caps` | the caps check |
| `oberonchat.bypass.filter` | the word filter |

A bypassed check **never runs** — it is not merely ignored on the way out. Staff with a spam bypass never see a wait, and their messages still land in the history the other checks read.

## One complaint per message

If a message trips both the word filter and the caps check, the player is told about the **first** one only — word filter before caps. Two complaints about one message reads like a malfunction.

Both weights still count towards the violation total.
