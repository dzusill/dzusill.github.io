---
title: "Body & text"
description: "Lines of text, blank spacers, item pictures, and how to make a wall of text readable."
---

The **body** is everything between the title and the buttons. It is a list, and each entry is one element.

```yaml
body:
  - type: text
    text: "<gray>Welcome back, <white>%player_name%</white>."
    width: 300
```

The `- ` is not decoration — it marks one item in a list. Every element needs one.

## Text elements

| Key | Meaning |
|---|---|
| `type` | `text` (default) or `item` |
| `text` | the line. MiniMessage, placeholders and icons all work. `content` is accepted as a synonym |
| `width` | pixels before it wraps. Default 200 |

`width: 300` to `320` suits most screens. Too narrow and every line wraps; too wide and the screen stretches.

## Blank lines are the design

An entry with no text is a deliberate spacer:

```yaml
body:
  - type: text
    text: "<white>Money: <green>$220"
    width: 250
  - type: text
    text: ""
  - type: text
    text: "<white>Kills: <red>14"
    width: 250
```

Four stats packed together read as a paragraph. Spaced out, each is a fact. This one habit does more for a stat card than any amount of colour.

Both `text: ""` and omitting `text` entirely work.

## Line breaks inside one element

`\n` inside a double-quoted string breaks the line, which is handy for a heading with its explanation attached:

```yaml
  - type: text
    text: "<yellow><b>1. Be decent</b>\n<gray>No harassment, slurs or hate speech."
    width: 320
```

## Item elements

An actual item stack rendered in the body, with its real tooltip:

```yaml
body:
  - type: item
    material: diamond_sword
    amount: 1
    description: "<gray>The reward for this quest"
    width: 32
```

| Key | Meaning |
|---|---|
| `material` | an item id. **Required.** `minecraft:` is added if missing |
| `amount` | stack size, default 1 |
| `description` | a caption beside it |
| `width` | the box, default 200 |

Unlike `<item:...>` in a label — which is a flat inline picture — this is a real item, so it hovers with a proper tooltip and shows enchantment glint. An unknown material falls back to stone rather than failing the dialog.

## Titles

```yaml
title: "<gradient:#5BE585:#2C99F8><b>Server menu</b></gradient>"
external-title: "<white>Main Menu"
```

`title` is the heading on the screen itself.

`external-title` is the short name shown when the dialog is referenced from *outside* — the pause-screen button, for example. Optional; the title is used if absent.

**An empty title hides the header bar entirely:**

```yaml
title: ""
```

That is a real design, not a mistake. Use it when the buttons or the body carry the screen and a heading would just add noise — a big menu, or a confirmation whose question is the body.

## Making a wall of text readable

The rules page pattern, which is worth copying wholesale:

```yaml
type: notice
title: "<gold><b><item:book> Server rules</b></gold>"

body:
  - type: text
    text: "<gray>Playing here means you accept these."
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<yellow><b>1. Treat people decently</b>\n<gray>No harassment, slurs or hate speech."
    width: 320
  - type: text
    text: "<yellow><b>2. No cheating</b>\n<gray>Hacked clients, x-ray and macros are all bans."
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<dark_gray>─────────────────────────────"
    width: 320
  - type: text
    text: "<gray>Punishments escalate: <white>warning → mute → ban</white>."
    width: 320

ok-button:
  label: "<gray>Back"
  width: 100
  actions: ["[back]"]
```

Four habits doing the work:

1. **A numbered heading per rule**, bold and coloured, with the detail in grey underneath.
2. **Blank spacers** between the intro, the rules and the footer.
3. **A divider line** of box-drawing characters before the closing note.
4. **One consistent `width`** so nothing wraps unevenly.

## Generated lines

`dynamic-body` appends lines built from live data or a leaderboard placeholder — a top-10, a world list. Static `body` lines always come first, so a heading and a divider stay above the generated rows.

See [Leaderboards](/plugins/ddialogs/features/leaderboards).

## MiniMessage cheat sheet

| | |
|---|---|
| `<red>` `<green>` `<blue>` `<yellow>` `<gold>` `<aqua>` `<gray>` `<white>` `<dark_gray>` | colours |
| `<#FF8800>` | any hex colour |
| `<gradient:#5BE585:#2C99F8>text</gradient>` | a fade |
| `<b>` `<i>` `<u>` `<st>` | bold, italic, underline, strikethrough |
| `<reset>` | back to plain |

Tags close with `</...>`, but a colour applies until the next colour anyway, so most lines need no closing tags at all.
