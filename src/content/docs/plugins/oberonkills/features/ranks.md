---
title: "Rank Prefixes"
description: "Optional rank prefixes in death messages — off by default, and why order is the only thing that can go wrong."
---

Off by default. Most servers do not want a rank in a death message, so the list ships empty:

```yaml
Ranks: []
Default-Rank: ""
```

## Turning it on

```yaml
Ranks:
  - Permission: "group.owner"
    Display: "<gradient:#9B1306:#C21807>[Owner]</gradient>"
  - Permission: "group.admin"
    Display: "<red>[Admin]</red>"
  - Permission: "group.mod"
    Display: "<green>[Mod]</green>"

Default-Rank: ""
```

Then use the tags:

```yaml
  Pvp:
    sword:
      - "<killer_rank> <#C21807><killer></#C21807> <gray>slew</gray> <victim_rank> <#C21807><victim></#C21807>"
```

| Field | Is |
|---|---|
| `Permission` | what marks a player as holding this rank |
| `Display` | MiniMessage, with `%player%` available if you want the name inside it |

## Order is the only thing that goes wrong

**Highest rank first.**

In almost every permission setup an owner also inherits every lower group's node, and the **first match wins**. List
`mod` above `owner` and your owner shows up as a mod.

If every rank is coming out wrong, this is why.

## `Default-Rank`

What somebody with no matching rank gets. Empty by default, so `<killer_rank>` for an ordinary player renders as
nothing — which is usually what you want, rather than `[Member]` on every death message.

If you set it, mind the spacing in your format: a message written as `<killer_rank> <killer>` gains a leading space
for players with no rank. Put the space inside the `Display` values instead if that bothers you.

## Ranks are parsed, names are not

The rank prefix comes from your config, so its MiniMessage is applied. The player name comes from the server —
possibly via a nickname plugin — so it is inserted as literal text.

That asymmetry is deliberate: config is trusted, player-influenced data is not.

## Same list as OberonStaff?

The shape is the same but the lists are separate — one plugin's death messages and another's staff chat do not have
to be styled alike, and forcing them to share would mean neither could change without the other.

If you want them identical, copy the block.
