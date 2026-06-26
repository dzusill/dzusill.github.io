---
title: "quantity-menu.yml"
description: "plugins/dRotatingShop/quantity-menu.yml controls the look of the buy menu — its size, title, every slot, and each button's icon, name and lore. Reloads with…"
---

`plugins/dRotatingShop/quantity-menu.yml` controls the look of the [buy menu](/plugins/drotatingshop/features/the-buy-menu/) — its size, title, every slot, and each button's icon, name and lore. Reloads with `/dshop reload`.

## Top-level

```yaml
title: "<dark_gray>Buy <gray>›</gray> <item>"   # <item> = the item's display name
size: 27                                          # inventory size (multiple of 9, 9–54)
fill-material: GRAY_STAINED_GLASS_PANE            # empty-slot filler
```

## Preview

The preview is the **buy button** — it shows the item with the selected amount.

```yaml
preview:
  slot: 13
  name: "<item>"
  lore:
    - "<gray>Quantity: <yellow>{quantity}</yellow><gray>/</gray><yellow>{max}"
    - "<gray>Unit price: <gold>{unit_price}"
    - "<gray>Total: <gold>{total_price}"
    - "<gray>Stock: <white>{stock} <dark_gray>|</dark_gray> <gray>Limit: <white>{limit}"
    - "<green>▶ Click to buy"
```

**Preview tokens:** `{quantity}`, `{max}`, `{unit_price}`, `{total_price}`, `{stock}`, `{limit}`. The title/name token `<item>` is the item's display name.

## Buttons

Six steppers plus a back button, each fully styleable:

```yaml
buttons:
  add-1:      { slot: 14, material: LIME_STAINED_GLASS_PANE, name: "<green><bold>+1",       lore: [ "<gray>Add <white>1" ] }
  add-half:   { slot: 15, material: LIME_STAINED_GLASS_PANE, name: "<green><bold>+{amount}", lore: [ "<gray>Add half a stack" ] }
  add-max:    { slot: 16, material: LIME_STAINED_GLASS_PANE, name: "<green><bold>+{amount}", lore: [ "<gray>Add a full stack" ] }
  remove-1:   { slot: 12, material: RED_STAINED_GLASS_PANE,  name: "<red><bold>-1",         lore: [ "<gray>Remove <white>1" ] }
  remove-half:{ slot: 11, material: RED_STAINED_GLASS_PANE,  name: "<red><bold>-{amount}",  lore: [ "<gray>Remove half a stack" ] }
  remove-max: { slot: 10, material: RED_STAINED_GLASS_PANE,  name: "<red><bold>-{amount}",  lore: [ "<gray>Remove a full stack" ] }
  back:       { slot: 18, material: ARROW, name: "<yellow>← Back to shop", lore: [ "<gray>Return without buying" ] }
```

| Field | Description |
|---|---|
| `slot` | Where the button sits. |
| `material` | Vanilla material for the icon **— or** use `head:` instead (below). |
| `head` | A custom-head texture (Base64 value). Use this **instead of** `material` to put player heads on the buttons. |
| `name` / `lore` | MiniMessage. The stepper token `{amount}` is the step size (e.g. `32` / `64`). |

### Using custom heads

```yaml
back:
  slot: 18
  head: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvLi4uIn19fQ=="
  name: "<yellow>← Back"
```

## Notes

- The **half / full** buttons are automatically hidden for non-stackable items (where they'd duplicate `±1`).
- Removing a button (deleting its block, or giving it a negative `slot`) simply leaves it out.
- `size` must hold every slot you reference; out-of-range slots are ignored and logged.
