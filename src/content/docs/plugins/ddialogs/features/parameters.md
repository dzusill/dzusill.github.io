---
title: "Dialog parameters"
description: "Telling the next screen what the player just picked, so one file can serve a whole family of menus."
---

**`[dialog] <id> key=value` opens a screen and tells it what it is about.**

Without this a menu can only say *which* screen to open, never *what* it is about. "Pick a ticket category, then answer that category's questions" needed one hardcoded file per category, kept in step by hand. Now the category travels with the click and one form serves all of them.

## The shape

```yaml
dynamic-list:
  source: phalanx_ticket_categories
  template:
    - label: "<white>$(category_name)"
      actions:
        - "[dialog] ticket-form category=$(category_id)"
```

The first token after `[dialog]` is the id. Everything after it is `key=value`, separated by spaces.

The screen that opens can then write `$(category)` anywhere:

```yaml
title: "New ticket — $(category)"

body:
  - type: text
    text: "<gray>You picked <white>$(category)</white>."

buttons:
  - label: "<green>Submit"
    actions:
      - "[call] phalanx_ticket_create $(category)"
```

## Where a parameter shows up

Everywhere you can write a token: the title, `external-title`, body lines, button labels, tooltips, link `url`s, the `dynamic-inputs` template — and the strings a button runs.

## The three rules

| Rule | Why |
|---|---|
| A **dynamic-list row** beats a parameter of the same name | The row is the more specific of the two. Otherwise one parameter would relabel every row on the screen |
| An **input** beats both | A field the player filled in resolves last, at click time |
| Values **cannot contain spaces** | Parameters are split on whitespace |

`subject=hello world` sets `subject` to `hello` and drops the rest — the orphaned token has no key, and guessing one would put the wrong thing on the next screen without saying so. Pass an id, not a sentence.

:::tip[Keep the names distinct]
Name your parameters so they cannot collide with your row fields or input keys — `category` beside rows of `category_id`, `category_name` is fine. Then none of the precedence above can ever bite you.
:::

## How long a parameter lasts

A parameter is **replaced wholesale** by the next parameterised open, and **left alone** by an open without parameters.

That second half is what makes `[back]` work. The navigation history remembers ids, not parameters, so clearing on every plain open would drop a player back onto a screen built around a selection it no longer knows about.

They are dropped when the player disconnects, and when dialogs reload.

## Reopening the same screen

A dialog may open **itself** with a parameter. That is the "pick a tab" pattern, and it is a real change of state:

```yaml
dynamic-list:
  source: worlds
  template:
    - label: "<white>$(world_name)"
      actions:
        - "[dialog] world-picker picked=$(world_name)"
```

Reopening with *nothing* changed is the loop worth avoiding — that is what the startup check warns about.

## One deliberate asymmetry

A parameter is substituted into **text** when the screen is drawn, but into **actions** at click time — down the same path a typed field takes, which strips the characters that could end one command and start another, and caps the length.

:::caution[A parameter is not automatically trustworthy]
It can carry a player-chosen name — a warp, a nickname, a home. A dialog id is not a trust boundary, so a parameter reaching `[console]` is cleaned exactly like something typed into a text box. That is why it resolves late rather than being baked into the action when the screen was drawn.
:::

## What it costs in the pause menu

A parameterised `[dialog]` button is **dropped** from the baked pause-screen copy. `/dopen` takes an id and nothing else, so the screen would open without the selection it was written around — an empty list, or the wrong one. Dropping the button is the honest outcome.

See [the pause menu page](/plugins/ddialogs/features/pause-menu) for what else does and does not survive baking.

## Where next

- [Dynamic inputs](/plugins/ddialogs/features/dynamic-inputs) — the main reason parameters exist: fields built from what was picked
- [Calling other plugins](/plugins/ddialogs/features/external-plugins) — `[call]`, and handing a form's answers back
- Example 22 (`/paramdemo`) is this page in one file
