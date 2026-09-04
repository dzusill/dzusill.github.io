---
title: "Package Display Names"
description: "Your store names packages for a store page. This names them for chat."
---

Your store names packages for a store page. This names them for chat.

A package called `Nebula Rank (Monthly) - OberonSMP` on Tebex can read as a gold-gradient **⭐ Nebula Rank** in game, keep that name in Discord and on `%odonations_last_product%`, and bring its own announcement and embed with it — without touching the store.

## The short version

1. `/donations packages` — see what your store actually sends.
2. `/donations packages stubs` — write the unnamed ones into `packages.yml`.
3. Edit their `display-name`, then `/donations reload`.

Nothing is required: a package nobody has named keeps whatever the store called it.

## What an entry gives a package

```yaml
packages:
  nebula:
    match: ['6086671', 'Nebula Rank']
    display-name: '<gradient:#C21807:#F11800>Nebula Rank</gradient>'
    icon: '⭐'
```

- **A name in game**, everywhere a package is named: chat, Discord, `%odonations_last_product%`, the console.
- **An icon**, prefixed automatically, and available on its own as `{package_icon}`.
- **Optionally its own announcement** — its own chat lines, sound, firework, title, boss bar — merged over the normal purchase announcement one channel at a time.
- **Optionally its own Discord embed** colour, title and description.
- **A short name to be written against**: `nebula` works in `goals.yml` and in the hype/GG package filters, and keeps working when the package is renamed on the store.

The full key-by-key reference is [packages.yml](/plugins/oberondonations/configuration/packages-yml/).

## Why the key is yours, not the store's

The section key is a token you invent. That is what lets **one entry cover several store packages** — a monthly and a lifetime variant, the same rank sold on Tebex and CraftingStore, or a package whose name changed on the store last year and still appears in old purchases under both spellings. They all collapse to one name, one icon, one announcement.

It also means a goal written as `packages: [nebula]` keeps counting the right thing after somebody edits the store, which a goal written against a raw store name does not.

## If your store names already carry colour

A store may name its packages in MiniMessage — a gradient written one tag per letter — so the name that arrives is markup, not words. That keeps working untouched: the markup is parsed with the rest of the chat line, so those packages render coloured whether or not you name them here.

What changes is that you can claim one **by the word it reads as**. `match: ['Aether']` matches a package the store calls `<#A0F0FF><bold>A<#91E9FF><bold>e…`; the markup never has to be pasted into a config file. The same applies to `goals.yml` and the hype/GG filters.

`/donations packages` shows these by their readable name, marked `(styled in store)`.

## Colour is written once

`display-name` is MiniMessage, because chat can render it. Discord and the console cannot, and would print the tags as text — so the tags are **stripped automatically** on the way there rather than being maintained as a second spelling of every name. An emoji is not a tag and survives everywhere.

## One announcement per checkout

A purchase is announced once. When a checkout contains two packages that both carry their own announcement, **the most expensive one speaks for it** — buying a rank together with a small kit announces like the rank. Equal prices fall back to the order the store listed them.

## What a package may not do

An `announcement` block may set any channel **except `commands`**. Running a console command per package is how a second delivery system gets built by accident, next to the store's own plugin, and hands the same rank out twice. A package changes how a purchase looks; delivering it stays Tebex's job, permanently — see [Purchase Tracking](/plugins/oberondonations/features/purchase-tracking/).

## Testing one

```
/donations trigger <player> 25.00 nebula
```

The `product` argument takes a key from `packages.yml` and then behaves as that package for real, so what you see is what a buyer will see. Use the key rather than the display name: a command argument is a single word, so `Nebula Rank` cannot be typed here — `nebula` can.

## See also

- [packages.yml reference](/plugins/oberondonations/configuration/packages-yml/)
- [Announcements](/plugins/oberondonations/features/announcements/)
- [Community Goals](/plugins/oberondonations/features/community-goals/) — writing a goal against a package key
