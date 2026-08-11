---
title: "Item Names"
description: "The AxKills complaint, fixed three ways: custom names win, translation keys by default, and title-cased fallback."
---

This is the detail the client raised. AxKills wrote `netherite_sword` into death messages.

Three rules, in order.

## 1. A custom name wins

Somebody who named their sword *Widowmaker* in an anvil sees **Widowmaker** in the death message.

Most plugins get this wrong — they read the material and ignore the name. A named weapon is the thing a player is
proudest of, and the death message is where it should show up.

## 2. `TRANSLATE` — the default

```yaml
Item-Names:
  Mode: TRANSLATE
```

The item's **translation key** is sent, and each player's own client renders it:

| Player's client | Sees |
|---|---|
| English | Netherite Sword |
| German | Netheritschwert |
| Czech | Netheritový meč |

It is also right for items this plugin has never heard of — a Minecraft update adding a new weapon needs no change
here.

## 3. `PRETTY` — the fallback

```yaml
Item-Names:
  Mode: PRETTY
```

Title-cases the material name here instead:

| Material | Becomes |
|---|---|
| `NETHERITE_SWORD` | Netherite Sword |
| `BOW` | Bow |
| `DIAMOND_CHESTPLATE` | Diamond Chestplate |
| `MUSIC_DISC_11` | Music Disc 11 |

Always English, but a plain string — which is what you want if the message is also going somewhere that cannot render
a translatable component.

**Use `TRANSLATE` unless you have that reason.**

## Hover

```yaml
Item-Names:
  Hover: true
```

Attaches the item's own hover, so anyone reading the death message can mouse over the weapon and see it — enchants,
durability, lore and all.

Useful for staff. "Killed with a Netherite Sword" and "killed with a Sharpness V Netherite Sword with Fire Aspect II"
are different situations, and the second is one click away.

Turn it off if you find it noisy.

## Where the item comes from

The weapon in the killer's main hand **at the moment of the blow**, copied then — so it survives the weapon being
dropped, broken, or swapped before the victim actually dies.

For a bow or crossbow kill it is the launcher, found by checking the shooter's hands. A trident identifies itself.

## When there is no item

Bare hands, a mob kill, an environmental death: `<item>` renders as nothing at all rather than as `null` or `AIR`.

A format that mentions `<item>` in an `unarmed` message therefore reads a little oddly — which is a reason to give
`unarmed` its own wording, as the shipped config does.

## Colour and brackets are the message's business

`<item>` and `<mob>` come out **bare** — no brackets, no colour of their own — so the message decides:

```yaml
"<gold><item></gold>"        # Netherite Sword, gold
"<gray>[<item>]</gray>"      # [Netherite Sword], grey
"<#C21807><item></#C21807>"  # any hex colour
```

Bukkit's own `displayName()` would have been shorter, but it hard-codes both: `[Netherite Sword]`, in the item's
rarity colour, which no config could then change.

### `Strip-Styling`

```yaml
Item-Names:
  Strip-Styling: true    # default
Mob-Names:
  Strip-Styling: true    # default
```

Two names arrive already carrying a colour: an **enchanted weapon**, coloured by its rarity, and one **named by a
player** in an anvil or on a name tag. A colour set on a component beats the one it inherits — so without this,
`<gray><item></gray>` has no effect on either, and an enchanted sword shows up blue whatever the message says.

On by default, and it is applied at every depth: clearing the outer layer alone leaves a player-written name still
coloured inside.

Turn it off if you would rather see each weapon in its own rarity colour.

The item's hover survives either way, so staff can still see the enchantments that did it.
