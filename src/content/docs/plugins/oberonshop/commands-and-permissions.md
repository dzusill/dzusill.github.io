---
title: "Commands & Permissions"
description: "Command names come from command: in config.yml; the defaults are /shop and /adminshop."
---

Command names come from `command:` in `config.yml`; the defaults are `/shop` and `/adminshop`.

## Player commands

| Command | Permission | |
|---|---|---|
| `/shop` | `oberonshop.use` | The main menu |
| `/shop <category>` | + the category's own | Opens it directly |
| `/shop <category> <player>` | `oberonshop.open.others` | Opens it in someone else's screen |
| `/shop search [query]` | `oberonshop.search` | Without a query, asks you to type one |
| `/shop favorites` | `oberonshop.favorites` | |
| `/shop recent` | `oberonshop.recent` | |
| `/shop popular` | `oberonshop.popular` | |
| `/shop repeat` | `oberonshop.repeat` | Reopens your last purchase |

Opening a category for someone else checks **their** access, not yours — the point is to see what they
see. A staff member with every bypass still cannot push a maintenance-locked shop onto a player who is
locked out of it.

## Admin commands

| Command | |
|---|---|
| `/adminshop reload` | Re-reads every config, GUI and shop file |
| `/adminshop maintenance <on\|off> [broadcast]` | |
| `/adminshop restock [shop] [item]` | Refills now; reports how many entries actually moved |
| `/adminshop import perfshop [path] [--apply]` | Dry run without `--apply`. See [Migrating](/plugins/oberonshop/migrating-from-perfshop/) |
| `/adminshop doctor` | Self-check — run this first when something looks wrong |
| `/adminshop failures [page]` | Purchases that failed after payment |

All under `oberonshop.admin`.

### `/adminshop doctor`

Answers most "why is it doing that" questions in one screen: storage and why it is not working, the
maintenance flag, world and game-mode rules, category and product counts, every catalog problem, every
currency and whether its plugin is installed, stock/limit/sale/pricing state, and which custom-item
plugins resolved.

It also reports the two halves of the commonest configuration mistake: a category file nothing opens, and
a menu icon that opens nothing.

### `/adminshop reload`

Re-reads everything and repaints open menus. Some settings decide what gets *built* at startup and cannot
be changed live — the database backend, the command names, the search input mode, whether stock and
limits are enabled at all. If one of those changed, reload **says so** rather than reporting success for
an edit that could not have taken effect.

## Permissions

### Players

| Node | Default | |
|---|---|---|
| `oberonshop.use` | true | Open the shop |
| `oberonshop.search` | true | |
| `oberonshop.favorites` | true | |
| `oberonshop.recent` | true | |
| `oberonshop.popular` | true | |
| `oberonshop.repeat` | true | |

All default-true, so a public shop needs no setup. Lock one down with a negative node.

### Staff

| Node | Default | |
|---|---|---|
| `oberonshop.admin` | op | Every `/adminshop` subcommand |
| `oberonshop.open.others` | op | |
| `oberonshop.bypass.maintenance` | op | |
| `oberonshop.bypass.world` | op | |
| `oberonshop.bypass.gamemode` | op | |
| `oberonshop.bypass.limit` | op | |
| `oberonshop.bypass.stock` | op | |

### Configured, not declared

These you invent in your own config:

- **Category and product gates** — `required-permission:` in a shop file
- **Rank discounts** — `discounts.ranks.<name>.permission`
- **Limit multipliers** — `limits.modifiers.<name>.permission`
- **Variant options** — `permission:` on one option

The defaults use `oberonshop.discount.vip` / `.mvp` and `oberonshop.limit.vip`, but the node is whatever
you write.
