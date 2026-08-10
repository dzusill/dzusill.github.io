---
title: "Quick Start"
description: "Restyle the three message lines, set the reply timeout, hand out the staff bypasses, and decide about the message log."
---

## 1. Restyle the three lines

They are in `config.yml`, not `messages.yml`, because they are built from MiniMessage tags:

```yaml
Formats:
  Sender: "<#C21807>You <#7e7e7e>→</#7e7e7e> <#C21807><target></#C21807><dark_gray>: <white><message>"
  Receiver: "<#C21807><sender></#C21807> <#7e7e7e>→</#7e7e7e> <#C21807>You</#C21807><dark_gray>: <white><message>"
  Social-Spy: "<dark_red><bold>SocialSpy</bold></dark_red> <dark_gray>»</dark_gray> …"
```

Three tags: `<sender>`, `<target>`, `<message>`. All three are inserted as plain text and never parsed, so nobody can
put colours — or a clickable component — into somebody else's chat by typing them.

## 2. Set the reply timeout

```yaml
Reply:
  Timeout-Seconds: 300
```

How long `/r` keeps working after the last exchange. The old script wiped reply targets on quit **and on join**, so
reconnecting lost the conversation. Five minutes is a reasonable default; `0` means never expire, which is the
classic behaviour if you prefer it.

## 3. Hand out the two staff bypasses

```
/lp group mod permission set oberonmsg.ignore.bypass true
/lp group mod permission set oberonmsg.message.bypass true
```

| Node | Grants |
|---|---|
| `oberonmsg.ignore.bypass` | cannot be ignored, and their public chat is never hidden |
| `oberonmsg.message.bypass` | can reach a player who has `/msgtoggle` on |

The first matters more than it looks: without it, a player under investigation can silence the staff member handling
their report with `/ignore`.

Neither overrides *your own* ignore list. Being un-ignorable is about other people's lists; your own is your
decision.

## 4. Decide about hiding public chat

```yaml
Ignore:
  Hide-Public-Chat: true
```

On by default. Ignoring somebody who then keeps talking in public chat is not much of an ignore, and it is what
players expect the word to mean.

## 5. Decide about the message log

```yaml
Log:
  Enabled: false
```

**Off by default, deliberately.** Recording what players say to each other in private is a decision you should make
knowingly and be able to tell your players about. Turn it on and `/oberonmsg log` shows the recent ones.

## 6. Social spy

```
/lp group mod permission set oberonmsg.socialspy true
```

Then `/socialspy` to switch it on. Spies never see their own conversations twice — a staff member messaging somebody
gets their sender line and nothing else.
