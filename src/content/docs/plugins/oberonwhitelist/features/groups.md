---
title: "Groups & Ranks"
description: "How ranks inherit commands through extends, how a player is matched to one, and what priority decides."
---

A group is a rank's command list. Each one lists what it adds, and inherits the rest.

```yaml
groups:
  default:
    priority: 0
    commands:
      - /home
      - /spawn
      - /msg

  mod:
    priority: 10
    extends: default
    commands:
      - /kick
      - /vanish

  admin:
    priority: 20
    extends: mod
    commands:
      - /ban
```

`admin` ends up with `/ban`, `/kick`, `/vanish`, `/home`, `/spawn` and `/msg`. Inheritance is transitive and resolved once, when the config loads.

| Key | Meaning |
|---|---|
| `priority` | which group wins when a player matches several — higher wins |
| `extends` | inherit every command of the named group |
| `commands` | what this group adds; the leading `/` is optional |

## How a player is matched

In order:

1. **Permission node** `oberonwhitelist.group.<name>`, checked highest priority first
2. **LuckPerms primary group**, when its name matches a group defined here
3. **`default`**

Permissions come first deliberately: they work with any permissions plugin, they are inspectable and changeable without touching this config, and they keep the resolver working on a server with no permissions plugin at all.

```
/lp group mod permission set oberonwhitelist.group.mod true
```

### Using LuckPerms primary groups instead

Name your groups the same as your LuckPerms groups and they resolve on their own — no nodes to assign:

```yaml
groups-from-luckperms: true
```

Set it to `false` to ignore LuckPerms entirely and use permission nodes only.

:::note
The group name must match exactly (case-insensitively). A LuckPerms group with no matching entry here falls through to `default`, which is the safe direction to fail.
:::

### Priority in practice

Priority only matters for players matching more than one group — someone holding both `oberonwhitelist.group.mod` and `oberonwhitelist.group.helper`. The higher number wins.

Keeping priority in the same order as your `extends` chain avoids surprises: `default: 0`, `mod: 10`, `admin: 20`.

## Which group a player ended up in

```
/obw groups Steve
```

```
Steve is in mod with 47 commands.
```

Without a name, it lists every group:

```
/obw groups
```

```
Groups, highest priority first:
• admin  priority 20, 63 commands, extends mod
• mod    priority 10, 47 commands, extends default
• default priority 0, 41 commands
```

The command count includes inherited commands, so it is a quick check that `extends` is doing what you meant.

## Caching

A player's group is resolved once and cached — the check runs for every command anybody types, and walking the inheritance chain each time would be waste.

**With LuckPerms installed, a rank change applies immediately.** The plugin subscribes to LuckPerms' own recalculation event and drops that player's cached rank when it fires, so this is all you need:

```
/lp user Steve parent set mod
```

No reload, no rejoin. It covers the indirect cases too — editing a group Steve inherits from, or adding a permission to it.

**Without LuckPerms**, ranks come from `oberonwhitelist.group.<name>` permission nodes, and there is no event to listen for. A change applies on the player's next login, or after:

```
/obw reload
```

which clears every cached rank.

## Broken configs are reported, not fatal

A missing parent or a circular `extends` chain does not stop the plugin loading:

```
[OberonWhitelist] Group 'mod' extends 'moderator', which is not defined; ignored.
[OberonWhitelist] Group 'a' has a circular extends chain at 'b'; the cycle was cut
and the rest of the chain ignored.
```

The group keeps whatever resolved cleanly. A whitelist that refuses to start either takes the server down or — worse for this plugin's job — leaves it with no whitelist at all, so it degrades instead.

Both warnings also appear in the `/obw reload` output, so you see them without reading the console.
