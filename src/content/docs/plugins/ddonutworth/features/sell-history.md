---
title: "Sell History"
description: "A paginated GUI of what has been sold: the item, how many, what it earned, and how long ago."
---

```
/sellhistory
/sellhistory <player>
```

A paginated GUI of what has been sold: the item, how many, what it earned, and how long ago.

Viewing someone else's needs `ddonutworth.history.others`.

## Entries merge

Repeat sales of the same item merge into a single entry rather than filling the list with one line per
click. Sell 4 diamonds, then 6 more, and you have one entry reading 10 — so the list answers "what have I
been selling" instead of scrolling forever.

The merged entry keeps the later timestamp, so it also stays in the right place under the "most recent"
sort.

## Sorting

The `sorting` icon cycles four orders:

| Order | |
|---|---|
| Most Recent | default |
| Highest Price | what earned the most |
| Lowest Price | |
| Name | alphabetical |

`{currentSort}` in the icon's lore shows which is active.

## How much is kept

```yaml
history:
  size: 100
```

Entries per player. Past that the oldest drop off. Because entries merge, 100 goes a long way — it is 100
distinct *items*, not 100 transactions.

## The entry lore

From `gui/history.yml`:

```yaml
entry-lore:
  - "&7Sold: &f{amount}"
  - "&7Earned: #00F986${total}"
  - "&7When: &f{when}"
```

| Token | |
|---|---|
| `{amount}` | units sold |
| `{total}` | money earned |
| `{when}` | `just now`, `5m ago`, `3h ago`, `2d ago` |

`{when}` is deliberately coarse — an absolute timestamp reads badly on an item tooltip.

## Lifetime totals

Everything a player has ever earned from selling is tracked separately and exposed as
`%ddonutworth_sold_total%`. See [Placeholders](/plugins/ddonutworth/placeholders/).
