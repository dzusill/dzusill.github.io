---
title: "config.yml"
description: "The main settings file. Comments survive reloads, so you can annotate it freely."
---

The main settings file. Comments survive reloads, so you can annotate it freely.

> There is no `license-key` field, and there never will be. The plugin makes no network calls.

## pricing

```yaml
pricing:
  source: rotating-shop
  sell-ratio: 0.20
  temporary-adjustment:
    enabled: false
    percent: 20
  adjust-overrides: false
  global-multiplier: 1.0
  rounding:
    decimals: 2
    mode: HALF_UP
```

| Key | Default | What it does |
|---|---|---|
| `source` | `rotating-shop` | **Legacy.** Set it to `independent` if you want `temporary-adjustment` to apply — see below. Any unrecognised value falls back to `rotating-shop` |
| `sell-ratio` | `0.20` | **Inert.** It scaled an external shop's buy price; there is no shop |
| `temporary-adjustment.enabled` | `false` | A blanket adjustment on every price. Only applied when `source: independent` |
| `temporary-adjustment.percent` | `20` | Signed: `20` = +20%, `-15` = 15% off |
| `adjust-overrides` | `false` | **Inert.** It decided whether hand-set prices rode a shop's adjustment |
| `global-multiplier` | `1.0` | Applied to every payout on top of everything else. `2.0` = double-sell weekend |
| `rounding.decimals` | `2` | Decimal places money is held to. `0` for a currency with no subunit; max `8` |
| `rounding.mode` | `HALF_UP` | Any Java `RoundingMode` name: `HALF_UP`, `HALF_EVEN`, `DOWN`, `UP`, … |

`source`, `sell-ratio` and `adjust-overrides` are all left over from the version that derived prices from
dRotatingShop. That bridge is gone: [prices.yml](/plugins/oberonsell/configuration/prices/) is the only source of worth. The one thing
`source` still decides is whether `temporary-adjustment` is honoured — at the shipped `rotating-shop` it is
not, because the plugin defers to a shop's own adjustment and there is no shop to ask.

**If you want a weekend markup, set `source: independent`.**

Money is held exactly and rounded once, at `rounding`. See [Pricing](/plugins/oberonsell/features/pricing/#money-is-exact).

## price-format

How an amount is written out in messages, lore, GUIs and placeholders. **Display only** — nothing here can
change what is paid.

```yaml
price-format:
  grouping: us
  decimals: 2
  compact-thousands: true
  compact-thousands-decimals: 1
  compact-thousands-min-abs: 1000
  compact-millions-min-abs: 1000000
  compact-billions-min-abs: 1000000000
  compact-trillions-min-abs: 1000000000000
  compact-quadrillions-min-abs: 1000000000000000
  suffix-thousands: K
  suffix-millions: M
  suffix-billions: B
  suffix-trillions: T
  suffix-quadrillions: Q
  count-format: grouped
```

| Key | Default | What it does |
|---|---|---|
| `grouping` | `us` | `us` → `1,234,567.89`; `eu` → `1.234.567,89` |
| `decimals` | `2` | Maximum decimals on a plain amount: at `2`, `1234` reads `1,234`, `1234.5` stays `1,234.5`. Clamped to `0`–`6` |
| `compact-thousands` | `true` | Abbreviate large amounts (`1,500,000` → `1.5M`). Off prints the full number |
| `compact-thousands-decimals` | `1` | Maximum decimals on an abbreviation: at `2`, `1.5M` and `1.25M` are both possible. Clamped to `0`–`6` |
| `compact-*-min-abs` | see above | The amount at which each suffix takes over. `0` disables that tier |
| `suffix-*` | `K` `M` `B` `T` `Q` | The suffix each tier uses. Display only, never parsed back |
| `count-format` | `grouped` | How an item **count** is written: `grouped` → `1,000,000`, `compact` → `1.1M`, `plain` → `1000000` |

Tiers are tried **largest first**, so `1500000000000` reads `1.5T` rather than `1500B`. A disabled tier
falls through to the next one down — set `compact-thousands-min-abs: 0` to keep four-figure prices written
out in full while millions still abbreviate.

### Item counts

Everything above prices money. `count-format` prices *quantities* — the numbers in
[`/sellhistory`](/plugins/oberonsell/features/sell-history/), the `{amount}` and `{items}` tokens in the sold and summary
messages, and the item track of [`/selltop`](/plugins/oberonsell/features/sell-leaderboard/).

It is a **separate setting from `compact-thousands` on purpose.** Abbreviating six-figure prices is not the
same wish as reading `Sold 1.1M items`, and an owner who wants short counts should get them whether or not
prices abbreviate. The two never have to agree.

```yaml
count-format: grouped     # 1,000,000   (1.000.000 when grouping is 'eu')
count-format: compact     # 1.1M
count-format: plain       # 1000000
```

`compact` reuses `compact-thousands-decimals` and the `suffix-*` values, so a count and a price abbreviate
the same way — set `compact-thousands-decimals: 2` and a count reads `1.15M`. Below the thousands mark
there is nothing to abbreviate and a count is written out. Anything unrecognised falls back to `grouped`
rather than breaking every line that reports a count.

`%oberonsell_top_items_1%` follows this setting like every other count; the `_short` placeholder forms ask
for an abbreviation by name and stay compact regardless.

## Presentation

Where messages appear **and what they sound like**. Categories set the common case; `Overrides` changes one
exact [messages.yml key](/plugins/oberonsell/configuration/messages/), including silencing it completely.

```yaml
Presentation:
  Categories:
    SALE:
      Channel: BOTH
      Sound:
        Name: entity.experience_orb.pickup
        Volume: 1.0
        Pitch: 1.2
    TOGGLE:
      Channel: CHAT
    ERROR:
      Channel: CHAT
    INFO:
      Channel: CHAT
  Overrides:
    # One exact key, louder than its category
    worth_toggle_on:
      Sound:
        Name: block.note_block.pling
        Pitch: 1.5
    sellaxe.nothing:
      Channel: NONE
```

`Channel` is `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. Shipped sale notifications use `BOTH`, so `/sell`,
Sell Axe and auto-sell show the payout and item count above the hotbar while keeping a chat record. Every
individual message can be overridden, and `/oberonsell reload` applies changes immediately.

### Sound

Optional, and off unless you add it. Every message key can carry one.

| Key | Default | What it does |
|---|---|---|
| `Name` | none | `entity.villager.no` or `ENTITY_VILLAGER_NO` — both spellings are accepted |
| `Volume` | `1.0` | |
| `Pitch` | `1.0` | |
| `Enabled` | `true` | `false` silences this one without inheriting its category's sound back |

An override that states only `Sound` keeps its category's `Channel`, and one that states only `Channel`
keeps its category's `Sound` — a partial override means what it looks like it means. A sound name this
server version does not have plays nothing; the message still arrives, because a cosmetic typo should not
cost you the text.

So to give the `/toggleworth` messages a sound, either set one on the whole `TOGGLE` category or name
`worth_toggle_on` / `worth_toggle_off` individually under `Overrides`.

Trailing zeroes are trimmed on both forms, and `decimals` is a maximum rather than a fixed width: a round
million reads `1M` rather than `1.0M`, and at `decimals: 2` a plain `1234` reads `1,234` rather than
`1,234.00` while `1234.5` keeps its one decimal as `1,234.5`. There is no setting to turn this off.

A threshold is read as text rather than a number, so the quadrillions tier survives being written in the
file. A hand-typed threshold that is not a number falls back to its default rather than breaking every
price line.

## worth-lore

```yaml
worth-lore:
  enabled: true
  show-stack-total: true
  shulker-totals: true
  player-inventory: true
  allow-toggle: true
  inventories:
    - CHEST
    - BARREL
    - "Faction Chest"
  excluded-inventories:
    - "Auction"
    - "Crate"
    - "Kit"
    - "Shop"
    - "Vault"
    - "Backpack"
  only-real-containers: false
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Master switch. Needs [ProtocolLib](https://www.spigotmc.org/resources/1997/) — there is no fallback, and nothing else in the plugin needs it |
| `show-stack-total` | `true` | Price the whole stack instead of one item. Worth lore is hidden while you carry something so dragging still works — see [Worth Lore](/plugins/oberonsell/features/worth-lore/) |
| `shulker-totals` | `true` | Count what a container item carries towards its worth — tooltip **and** payout |
| `player-inventory` | `true` | Also decorate the player's own inventory while a container is open. Live-reloadable |
| `allow-toggle` | `true` | Let players use `/toggleworth` |
| `inventories` | (a long list) | **Whitelist.** Only these get lore; anything matching nothing gets none. An `InventoryType` name, or any part of a title |
| `excluded-inventories` | (six common GUI names) | Never get lore. Checked first and wins over the list above. A starting point to edit, not a detected list |
| `only-real-containers` | `false` | Decorate only inventories with a real holder, ruling out other plugins' menus wholesale |

See [Worth Lore](/plugins/oberonsell/features/worth-lore/).

## multipliers

```yaml
multipliers:
  enabled: true
  categories:
    - ores
    - crops
    # ...
  permission-based: true
  permission-cap: 10.0
  reset:
    enabled: true
    keep-fraction: 1.0
    max-bonus: 0.0
  progress-bar:
    filled: "▮"
    empty: "▯"
    length: 20
    filled-format: "{color}{bar}"
    empty-format: "&8{bar}"
    percentage-format: "{color}{percentage}%"
    colors:
      '0': "#C21807"
      '25': "#F11800"
      '50': "&e"
      '75': "#00F986"
      '100': "#00FB00"
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | The per-category tier system |
| `categories` | nine ids | Which `sell/<id>.yml` files to load. **Order sets category precedence** and filter order |
| `permission-based` | `true` | Honour `oberonsell.multiplier.<value>` nodes |
| `permission-cap` | `10.0` | Ceiling on the above, against typos. Floored at `1.0` |
| `reset.enabled` | `true` | Whether `/oberonsell resetmultiplier` may be used at all |
| `reset.keep-fraction` | `1.0` | How much of the earned multiplier a reset banks as a permanent floor |
| `reset.max-bonus` | `0.0` | Ceiling on a category's banked bonus. `0` = no ceiling |
| `progress-bar.filled` / `.empty` | `▮` / `▯` | Characters for `{progressBar}` |
| `progress-bar.length` | `20` | Bar width in characters |
| `progress-bar.filled-format` / `.empty-format` | `{color}{bar}` / `&8{bar}` | Full layout and colour of each bar segment |
| `progress-bar.percentage-format` | `{color}{percentage}%` | Full layout of `{progressBarCompletedPercentage}` |
| `progress-bar.colors.<percent>` | five thresholds | Colour selected from the highest threshold the player has reached |

Formats accept `{color}`, `{bar}` and, for the percentage, `{percentage}`. Colours accept `&a`, bare
`#00F986` or MiniMessage `<green>` syntax. Add, remove or move thresholds anywhere from `0` to `100`.

See [Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/).

## sellaxe

```yaml
sellaxe:
  enabled: true
```

Off = the listener is never registered and `/sellaxe give` refuses. Everything else about the axe is in
[sellaxe.yml](/plugins/oberonsell/configuration/sellaxe/).

## auto-sell

```yaml
auto-sell:
  enabled: true
  max-stack-size: 99
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Master switch. Off = the pickup listener is never registered |
| `max-stack-size` | `99` | Largest pickup paid for in one go. Clamped to `1`–`99` |

`max-stack-size` is a guard against a malformed item entity, not a balance knob — a stack larger than it is
left on the ground rather than sold. Players opt in individually with `/sell auto`, and need
`oberonsell.autosell`. See [Auto-Sell](/plugins/oberonsell/features/auto-sell/).

## anti-dupe

```yaml
anti-dupe:
  click-cooldown-ms: 250
```

The shortest gap between one player's GUI sales, in milliseconds. `0` disables it, which is only ever the
right answer on a single-player test server.

Selling is three steps — value, pay, remove — and a Vault deposit runs other plugins' listeners in the
middle of it. Without this, a player spamming the sell GUI's confirm button can start the second sale
before the first has removed its items, and be paid twice for the same stack. Raise it if your economy
plugin is slow.

A second lock, per container, is not configurable: two players clicking the same chest cannot both sell
from it at once. See [Selling](/plugins/oberonsell/features/selling/#safety-properties).

## history

```yaml
history:
  size: 100
```

Entries retained per player, floored at `1`. Repeat sales of the same item merge, so this is 100 distinct
items rather than 100 transactions.

## search

```yaml
search:
  input: sign
```

How the Item Prices GUI asks for a search term.

| Value | Behaviour |
|---|---|
| `sign` | opens a sign the player types into; the GUI comes straight back. Needs ProtocolLib |
| `chat` | closes the GUI and reads the player's next chat line. Works everywhere |

Without ProtocolLib, `sign` behaves as `chat` — the button always works. Which one is live is logged at
startup:

```
[OberonSell] Item searches are typed into a sign.
[OberonSell] Item searches are typed into chat. Install ProtocolLib to type them into a sign instead.
```

The sign is not a real block: it is drawn for that one player and taken back the instant they are done.
Nothing is placed and nobody else sees it. It is drawn with packets though, which is version-dependent by
nature — if a Minecraft update ever breaks it, set this to `chat` and the search keeps working.

See [GUIs](/plugins/oberonsell/configuration/guis/) for the icon and its wording.

## storage

```yaml
storage:
  type: sqlite
```

`sqlite` (the default) or `yaml`. MySQL is not implemented; an unknown value logs a warning and falls back
to SQLite rather than failing silently.

**sqlite** keeps one database file, `oberonsell.db`, in the plugin folder. Nothing to install — the driver
ships with the server. Every read and write happens off the server thread, and a player's record is loaded
during the login handshake, so nothing queries on the tick.

Records are held in memory and flushed in batches, on quit and on shutdown. Shutdown drains what is queued
with a ten-second ceiling, so a stuck write cannot hang the server closing.

**yaml** keeps `playerdata.yml` instead. It is still supported and still correct; it just re-reads and
re-sorts the whole file for every leaderboard query, which stops scaling once the file is large.

### Switching between them

A `playerdata.yml` found while SQLite is selected is imported once, logged, and renamed to
`playerdata.imported.yml` — the rename is what stops a second start importing it twice.

`/oberonsell migrate playerdata` moves records into whichever backend is live, in either direction, so
changing your mind later does not lose anything.

### Money at rest

Money columns are `TEXT`, not `DECIMAL`. SQLite's `DECIMAL` is an alias for `NUMERIC`, which becomes a
floating-point `REAL` — and a lifetime total large enough to matter would quietly lose its cents. The
leaderboard therefore narrows with a numeric cast and decides the exact order in Java.

## blacklisted-worlds

```yaml
blacklisted-worlds:
  - Creative
```

Selling is refused entirely in these. Matching ignores capitalisation, so a typo in a world's case is not a
loophole.

## disabled-gamemodes

```yaml
disabled-gamemodes:
  - CREATIVE
  - SPECTATOR
```

Game modes the plugin stays out of completely — no worth lore, no selling, no sell axe. Valid values are
`SURVIVAL`, `CREATIVE`, `ADVENTURE` and `SPECTATOR`; an unrecognised name is ignored rather than breaking
the list. An **empty** list falls back to `CREATIVE` and `SPECTATOR` rather than to nothing.

`CREATIVE` is there because a creative player has unlimited items, so selling from it is unlimited money.
Removing it opens that hole.

## custom-items

Which custom-item plugins to recognise, and where each writes its item id. See
[Custom Items](/plugins/oberonsell/features/custom-items/) for the full explanation of why this is config rather than
compiled in. It is an ignored section, so a source you delete stays deleted.
