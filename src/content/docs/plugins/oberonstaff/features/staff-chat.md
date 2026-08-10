---
title: "Staff Chat"
description: "Sending, toggle mode, the format string — and why player text can no longer inject formatting or clickable components into staff chat."
---

## Two ways to use it

**Send one line:**

```
/sc anyone free to check spawn?
```

**Switch the mode on:**

```
/sc
```

Everything you type now goes to staff instead of public chat, until you run `/sc` again. The mode is confirmed with an action bar.

## Who sees it

Everyone holding `Staff-Chat.Permission` (default `oberonstaff.staffchat`), plus the console when `Log-To-Console` is on.

The permission is re-checked on **every message**, not trusted from when the mode was switched on. A player who loses staff status while online stops reaching staff chat immediately, not at their next login.

## The format

```yaml
Staff-Chat:
  Format: "<#C21807><bold>Staff</bold></#C21807> <dark_gray>»</dark_gray> <rank><dark_gray>:</dark_gray> <red><message></red>"
```

Two MiniMessage tags:

| Tag | Is |
|---|---|
| `<rank>` | the sender's rank line, from [Ranks](/plugins/oberonstaff/features/ranks/) |
| `<message>` | what they typed |

`<player>` is available too, if you want the raw name somewhere separate from the rank line.

Restyle freely — it is ordinary MiniMessage.

## The injection fix

This is the part worth understanding, because it is a real security fix rather than a nicety.

The old script built **one string** containing the player's message and handed the whole thing to a MiniMessage parser:

```
send minimessage from "…%{_rankedName}%…: <red>%message%" to loop-player
```

Anything a player typed was therefore parsed as markup. Typing `<red><bold>` changed the colour. Typing `<click:run_command:'/op me'>free rank</click>` produced a **clickable component in every staff member's chat** that ran a command when clicked.

OberonStaff inserts the message through an unparsed MiniMessage placeholder instead. The parser inserts it as literal text and never looks inside it. Typing `<red>hello` in staff chat shows, exactly:

```
<red>hello
```

The player's **name** goes in the same way, because nickname plugins can put almost anything in one.

There is a test for it: no click or hover event may be built from player input.

## Toggle mode is stored properly

The old script keyed the toggle by player *name* (`{staffchat.toggle::%player%}`). Two consequences: anybody who changed their username silently lost the setting, and a restart lost everyone's.

OberonStaff keys it by UUID and writes it to the database, so it survives both.

## Where it sits in the chat pipeline

The listener runs at the **lowest** event priority, so a staff chat message is taken out of public chat before your chat formatting plugin ever sees it. A cancelled event at a later priority still leaves the earlier plugins having done work, and some of them log what they saw.

Staff chat is delivered directly, not through your chat formatter — which is why `Format` is the only place its appearance is decided.

## Placeholders

`%oberonstaff_staffchat%` returns `on` or `off` for the viewing player; `%oberonstaff_staffchat_users%` returns how many staff currently have the mode on. See [Placeholders](/plugins/oberonstaff/placeholders/).
