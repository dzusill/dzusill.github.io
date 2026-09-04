---
title: "packages.yml"
description: "What each store package is called in game. Nothing here is required — an unmapped package simply keeps the name the store sent."
---

What each store package is called in game. Nothing here is required — an unmapped package simply keeps the name the store sent.

## Finding out what your store sends

You cannot name a package until you know what the store calls it, and that only arrives with a purchase:

```
/donations packages
```

lists every package ever recorded — the store's id, its name, how often it sold, and whether anything here already claims it.

```
/donations packages stubs
```

appends every unmapped one to this file, ready to edit. It only ever adds what is missing: existing entries, and any comments around them, are left byte for byte as you wrote them.

## An entry

```yaml
packages:

  nebula:
    match: ['6086671', 'Nebula Rank', 'Nebula Rank (Lifetime)']
    display-name: '<gradient:#C21807:#F11800>Nebula Rank</gradient>'
    icon: '⭐'
```

| Key | Meaning |
|---|---|
| the section key (`nebula`) | **Yours**, not the store's. A short token you invent, which also works in `goals.yml` and the hype/GG package filters — and survives you renaming the package in Tebex |
| `match` | What the store actually sends: package ids, package names, or both. One entry may claim several, which is how a monthly and a lifetime variant, or the same rank on two different stores, share one name |
| `display-name` | What players see. MiniMessage, so colour and gradients work |
| `icon` | Optional. Prepended to the name wherever it appears, and available on its own as `{package_icon}` |

## Where the name shows up

`{product}` and `{packages}` in `announcements.yml`, the Discord embed, `%odonations_last_product%`, and the console.

MiniMessage is written **once**. Anywhere that cannot render a tag — Discord, the console — the tags are stripped automatically, so `<gradient:…>Nebula Rank</gradient>` arrives there as `Nebula Rank`. An emoji is not a tag and survives.

## Matching

`goals.yml` → `packages:`, and the hype/GG `eligible-packages` / `ignored-packages`, accept **any** of these for the entry above:

| You write | Matches by |
|---|---|
| `nebula` | the section key |
| `Nebula Rank` | the display name, colour ignored |
| `6086671` | the raw store id |
| `Nebula Rank (Lifetime)` | any raw name in `match` |

Case-insensitive. A file written against raw store ids before any of this existed keeps counting exactly what it did.

## A package's own announcement

Optional. Merged over `events.purchase` in `announcements.yml` **one channel at a time** — a package that only sets a sound keeps the event's chat lines.

```yaml
    announcement:
      chat:
        lines:
          - ''
          - '<#C21807>{player_head} <#AAAAAA>just unlocked {product}<#AAAAAA>!'
          - ''
      sound:
        enabled: true
        name: entity_ender_dragon_growl
      firework:
        enabled: true
```

Every channel may be set **except `commands`**. A per-package console command is how a second delivery system gets built by accident alongside the store's own plugin and hands a rank out twice; a package changes how a purchase *looks*, never what it *does*. Delivery stays Tebex's job.

## A package's own Discord embed

Optional. `color`, `title` and `description`; anything unset falls back to `webhooks.yml`.

```yaml
    discord:
      color: 0xC21807
      title: '🌌 Nebula Rank purchased'
      description: '**<player>** just went Nebula. Welcome aboard!'
```

## One checkout, two special packages

A purchase is announced once, so when a checkout contains more than one package carrying an `announcement` or `discord` block, **the most expensive line wins**; equal prices fall back to the order the store listed them. Buying a rank together with a $2 kit announces like the rank.

## Testing one

```
/donations trigger <player> 25.00 nebula
```

The `product` argument accepts a **key** from this file, and then behaves as that package for real — display name, icon and its own announcement all fire. The key is also the only spelling that works here, since a command argument is a single word and a package called `Nebula Rank` cannot be typed as one.

## See also

- [Package Display Names](/plugins/oberondonations/features/package-display-names/)
- [announcements.yml](/plugins/oberondonations/configuration/announcements-yml/)
- [Reloading](/plugins/oberondonations/configuration/reloading/)
