---
title: "Inputs (forms)"
description: "Text fields, checkboxes, dropdowns and sliders — all four input types, and how their values reach a command."
---

Inputs put fields on the screen. Whatever the player enters comes back as `$(key)` in a button's actions.

```yaml
inputs:
  - key: nick
    type: text
    label: "Your nickname"
    max-length: 16

buttons:
  - label: "<green>Save"
    actions:
      - "[player] nick $(nick)"
```

**`key` is the name you use later.** It may contain letters, digits and underscores only, and must not start with `dz_` (reserved). `$(nick)` picks up whatever that field holds.

:::note[Values arrive only when a button is pressed]
Nothing reads a field while the player types — the contents travel with the button press. This is why a live search box is impossible, and why searching is always "store the term, reopen the screen".
:::

## The four types

### text — a text field

```yaml
  - key: msg
    type: text
    label: "Your message"
    initial: "Hello"      # pre-filled, optional
    max-length: 200       # default 128
    width: 300
```

Add a `height` and it becomes a **multi-line box**:

```yaml
  - key: notes
    type: text
    label: "A big text box"
    max-length: 500
    height: 80            # any height at all makes it multiline
```

:::tip[Set max-length deliberately]
A number needs about ten characters. Leaving the default at 128 invites someone to paste a paragraph into your economy command.
:::

### boolean — a checkbox

```yaml
  - key: gift
    type: boolean
    label: "Send as a gift"
    initial: true
```

`$(gift)` becomes `true` or `false`.

### single_option — a dropdown

```yaml
  - key: reason
    type: single_option
    label: "Reason"
    options:
      - { id: spam, display: "<red>Spam", initial: true }
      - { id: rude, display: "<yellow>Rudeness" }
      - { id: other, display: "Something else" }
```

`$(reason)` becomes the **`id`** of the chosen option (`spam`), not the display text. `initial: true` marks the default.

A plain list is accepted as shorthand when id and label are the same:

```yaml
    options: [easy, normal, hard]
```

### number_range — a slider

```yaml
  - key: amount
    type: number_range
    label: "How many"
    start: 1
    end: 64
    step: 1        # omit for a smooth slider
    initial: 8
```

`$(amount)` becomes the number. Whole numbers arrive as `8`, not `8.0`, so they drop straight into a command.

:::caution[A slider is for approximate values]
Sliders suit "how many blocks of radius" and not "how much money". Nobody wants to drag to exactly $22 — use preset buttons plus a text field for that. See [the amount-picker pattern](/plugins/ddialogs/menu-patterns).
:::

## Every option, in one table

| Key | Applies to | Meaning |
|---|---|---|
| `key` | all | the name used as `$(key)`. Letters, digits, underscore |
| `type` | all | `text`, `boolean`, `single_option`, `number_range`. Default `text` |
| `label` | all | the caption. Defaults to the key |
| `width` | all | pixels, default 200 |
| `initial` | all | starting value |
| `max-length` | text | default 128 |
| `height` | text | presence makes it multiline |
| `options` | single_option | the list. At least one required |
| `start` / `end` | number_range | the range. Default 0–100 |
| `step` | number_range | omit for smooth |

## A complete form

```yaml
type: multi_action
title: "<green><b>Report a player</b></green>"
columns: 1

inputs:
  - key: who
    type: text
    label: "Who"
    max-length: 16

  - key: reason
    type: single_option
    label: "Reason"
    options:
      - { id: cheating, display: "<red>Cheating", initial: true }
      - { id: chat, display: "<yellow>Chat behaviour" }

  - key: details
    type: text
    label: "What happened"
    max-length: 500
    height: 80

  - key: urgent
    type: boolean
    label: "Needs a staff member now"

buttons:
  - label: "<green>Send report"
    width: 300
    actions:
      - "[console] report add $(who) $(reason) $(details)"
      - "[message] <green>Sent. Thank you."
      - "[close]"

exit-button:
  label: "<gray>Cancel"
  width: 100
  actions: ["[close]"]
```

## What happens to empty fields

Press the button without filling something in and `$(key)` becomes an empty string, so the command runs one argument short and your plugin complains. That is the right outcome — the player gets a real error from the thing that knows the rules, which is clearer than anything a dialog could invent.

Dialogs cannot validate. There is no "required" flag and no way to block a press.

## Safety

Submitted text arrives in a packet the client controls and ends up inside a command string. Before substitution, dDialogs strips newlines, semicolons, quotes and backslashes and caps the length — so a player cannot end your command and start their own.

That is protection against **injection**, not against **nonsense**. Combine it with `[player]` rather than `[console]` wherever you can, and let the target command do the real validation.
