---
title: "Group Mentions"
description: "@vip, @builder, @mod — ping every online member of a LuckPerms group. Requires LuckPerms."
---

`@vip`, `@builder`, `@mod` — ping every online member of a LuckPerms group. Requires LuckPerms.

---

## Configuration

```yaml
group:
  enabled: true
  disabled_groups:
    - "admin"
    - "owner"
  keyword: "@{group}"
  permission: "dmentions.mention.group.{group}"
  list:
    default:
      sound: "entity.chicken.egg"
      color: "#c0dee6"
      display: "@{group}"
      cooldown: 5
    __OTHER__:
      sound: "entity.chicken.egg"
      color: "#73c7dc"
      display: "@{group}"
      cooldown: 5
```

## How a group is matched

`keyword: "@{group}"` means the literal `@` plus a LuckPerms group name. Typing `@vip` matches the group `vip`.

The permission is per group: `dmentions.mention.group.{group}` expands to `dmentions.mention.group.vip`. So you can let players ping `@vip` while only staff can ping `@mod`:

```
lp group default permission set dmentions.mention.group.vip true
lp group mod permission set dmentions.mention.group.mod true
```

## disabled_groups

```yaml
disabled_groups:
  - "admin"
  - "owner"
```

These can never be mentioned, by anyone, regardless of permissions. This is the blunt instrument — use it for groups where "no player should ever be able to summon these people" is a policy, not a permission question.

## Per-group styling

`list` holds one entry per group, plus two specials:

| Entry | Applies to |
|---|---|
| `default` | the LuckPerms group literally named `default` |
| `__OTHER__` | every group without its own entry |
| any group name | that group specifically |

Give a group its own sound, colour, display and cooldown:

```yaml
list:
  vip:
    sound: "block.note_block.pling"
    color: "#ffd700"
    display: "@VIP"
    cooldown: 30
  mod:
    sound: "block.note_block.bell"
    color: "#ff5555"
    display: "@Staff"
    cooldown: 10
```

`display` need not match the group name — `@mod` can render as `@Staff`.

## Cooldowns

Per group, per sender. A player who just pinged `@vip` can still ping `@builder` immediately — the two have separate timers.

Set longer cooldowns on larger groups. A 5-second cooldown on a group of two is fine; on a group of forty it is a spam channel.

## Without LuckPerms

Group mentions do nothing — `@vip` stays plain text. Everything else keeps working.

## Next

- [Cooldowns & Limits](/plugins/dmentions/features/cooldowns-and-limits/)
