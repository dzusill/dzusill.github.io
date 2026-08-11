---
title: "Icons"
description: "Item pictures, block textures and player heads inline in any label — plus the two traps that draw a pink square."
---

Three tags put a picture inside text. They work anywhere text does: a label, a tooltip, a title, a body line, a leaderboard row.

| Tag | Shows |
|---|---|
| `<item:diamond>` | an item's icon |
| `<sprite:block/dirt>` | any texture, by path |
| `<sprite:minecraft:gui:widget/button>` | ...naming the atlas explicitly |
| `<head:Steve>` | a player's face |

```yaml
  - label: "<item:iron_sword> <white>Factions"
  - label: "<head:%player_name%> <white>Your profile"
    text:  "<sprite:block/grass_block_side> <white>Claim land"
```

:::note[Needs a 1.21.9+ client]
On anything older the tag renders as **nothing** rather than breaking the dialog. Losing an icon is survivable; losing the screen is not. That makes icons safe on a mixed-version server.
:::

## The two traps

Both draw the same pink missing-texture square, and both catch people out because the thing *feels* like a normal item.

### Blocks are 3D models

A block's inventory icon is rendered from a model — there is no flat `item/<name>` texture to draw. So:

```yaml
"<item:gold_block>"            # pink square
"<sprite:block/gold_block>"    # correct
```

**Chests, beds, shields and skulls are models too.** `<item:chest>`, `<item:red_bed>`, `<item:shield>` and `<item:skeleton_skull>` all fail.

### Animated items have no single texture

A clock ships as `clock_00` … `clock_31`, one frame per state; a compass likewise. There is no plain `item/clock`, so `<item:clock>` and `<item:compass>` both miss. Pick a different item — there is no shorthand for these.

## Check before you ship

Do not guess, and do not trust a table — including the one below. Your client jar is the authority:

```bash
unzip -l ~/Library/Application\ Support/minecraft/versions/*/[0-9]*.jar \
  | grep -oE 'textures/item/[a-z0-9_]+\.png' | sed 's|.*/||;s|\.png||' | sort -u
```

If your item is not in that list, `<item:>` will not draw it. Swap `item` for `block` to check `<sprite:block/…>` paths — note that `block/grass_block` does **not** exist, only `grass_block_top` and `grass_block_side`.

## A verified starting set

Every entry checked against a 1.21.11 client.

| Menu entry | Icon |
|---|---|
| Homes, houses | `<item:oak_door>` |
| Spawn, warps | `<item:filled_map>`, `<item:ender_eye>` |
| Teleport, RTP | `<item:ender_pearl>` |
| Playtime, queue | `<item:heart_of_the_sea>` |
| Money, balance | `<item:gold_ingot>`, `<item:gold_nugget>` |
| Shop, buy | `<item:emerald>` |
| Shards, crystals | `<item:amethyst_shard>` |
| Sell | `<item:hopper>` |
| Orders, chat, rules | `<item:paper>`, `<item:oak_sign>` |
| Stats, information | `<item:book>`, `<item:writable_book>` |
| Kills, PvP | `<item:iron_sword>`, `<item:diamond_sword>` |
| Deaths | `<item:bone>` |
| Mining | `<item:diamond_pickaxe>` |
| Mobs killed | `<item:rotten_flesh>` |
| Notifications | `<item:bell>` |
| Visuals, search | `<item:spyglass>` |
| Privacy, kits | `<item:chainmail_chestplate>`, `<item:iron_chestplate>` |
| Scoreboard | `<item:item_frame>` |
| Settings | `<item:comparator>` |
| Cosmetics | `<item:firework_rocket>` |
| Rewards, daily | `<item:experience_bottle>`, `<item:cake>` |
| Ping, redstone | `<item:redstone>` |
| Clear, cancel | `<item:barrier>` |
| Land, terrain | `<sprite:block/grass_block_side>` |
| Rich, valuable | `<sprite:block/gold_block>`, `<sprite:block/emerald_block>` |
| A player | `<head:Name>` |

## Player heads

```yaml
"<head:Steve>"
"<head:%player_name%>"
"<head:$(player_name)>"       # in a dynamic-list or leaderboard row
```

The client fetches the skin itself, so any name works — a leaderboard row, a payment target, the viewer.

:::caution[The name must be a real one]
Letters, digits and underscore, up to 16 characters. Anything else draws nothing.

This matters because of one specific accident: `<head:%some_placeholder%>` on a server where that expansion is not installed. PlaceholderAPI leaves the `%...%` verbatim, so the head is asked for a player called `%ajlb_lb_..._name%`.

dDialogs drops an invalid name rather than passing it on — but before it did, the whole dialog failed to encode and fell back to chat. If you ever see a dialog print itself into chat, this class of problem is why.
:::

## One icon per button

An item sprite next to an emoji reads as two icons fighting for the same slot. Pick the sprite and drop the emoji — a sprite also renders identically for every player, where an emoji depends on their font.

```yaml
label: "<item:iron_sword> <white>⚔ Factions"    # two icons
label: "<item:iron_sword> <white>Factions"      # one
```

And on a long menu, consider none at all. Fourteen icons is busier than zero; icons earn their place on a *short* list of similar-sounding words, where a picture tells them apart at a glance.
