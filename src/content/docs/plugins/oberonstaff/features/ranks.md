---
title: "Ranks"
description: "Rank display formats in config rather than code — why order matters more than anything else on this page."
---

Staff chat shows the sender's rank. Which one they get, and how it looks, is a config list.

```yaml
Ranks:
  - Permission: "group.owner"
    Display: "<gradient:#9B1306:#C21807><bold>Owner</bold></gradient> <#C21807>%player%</#C21807>"
  - Permission: "group.manager"
    Display: "<gradient:#1A1AA2:#1149AF><bold>Manager</bold></gradient> <#1149AF>%player%</#1149AF>"
  - Permission: "group.admin"
    Display: "…"

Default-Rank: "<#808080><bold>Member</bold></#808080> <dark_gray>|</dark_gray> <#808080>%player%</#808080>"
```

| Field | Is |
|---|---|
| `Permission` | what marks a player as holding this rank |
| `Display` | MiniMessage template, with `%player%` for the name |

The first rank whose `Permission` the player holds wins. No match falls through to `Default-Rank`.

## Order is the whole contract

**Highest rank first.**

In almost every permission setup, an owner also inherits every lower group's node — `group.owner`, `group.admin`, `group.mod` and `group.helper` are all true for them. First match wins, so if `helper` is listed above `owner`, your owner shows up as a helper.

If everybody is coming out with the wrong rank, this is why.

## Making them match your setup

The shipped list uses LuckPerms-style `group.<name>` nodes. If yours differ, edit `Permission`. Check one:

```
/lp user <someone> permission check group.admin
```

Nothing stops you using a node that is not a group at all — `oberonstaff.rank.senior`, say — if you would rather assign the display explicitly.

## The gradients

The old script wrote gradients as a hex code per letter:

```
"<#C21807>&lM<#DA1804>&le<#F11800>&ls…"
```

The config uses MiniMessage's own gradient tag instead:

```
"<gradient:#9B1306:#C21807><bold>Owner</bold></gradient>"
```

Same result on screen, far easier to restyle — and it does not have to be rewritten when the word changes length.

## Adding a rank

Insert it in the right place in the list:

```yaml
Ranks:
  - Permission: "group.owner"
    Display: "…"
  - Permission: "group.builder"                     # new, below owner
    Display: "<#E8B923><bold>Builder</bold></#E8B923> <#E8B923>%player%</#E8B923>"
  - Permission: "group.admin"
    Display: "…"
```

`/oberonstaff reload` — no restart needed.

> `Ranks` is never merged back from the defaults. A rank you delete stays deleted.

## Where the rank is used

- **Staff chat** — via the `<rank>` tag in `Staff-Chat.Format`.
- **`%oberonstaff_rank%`** — the formatted rank line, if you want it on a scoreboard or in a tab list.

The rank line is built with the player's name inserted as **unparsed** text — see the [injection fix](/plugins/oberonstaff/features/staff-chat/) — so a nickname plugin cannot smuggle formatting in through a name.

## Checking your work

```
/sc test
```

The line you get back is the rank as everybody else sees it. If it says **Member**, no `Permission` in the list matched.
