---
title: "Make your first dialog"
description: "From an empty file to a working menu. No Java, no programming, ten minutes."
---

You will build a menu with real buttons. No Java, no programming, nothing to compile. If you can edit a text file, you can do this.

## Step 1 — Make a file

Go to `plugins/dDialogs/dialogs/` and create a new file called **`mymenu.yml`**.

The filename matters: `mymenu.yml` means this dialog's **id** is `mymenu`. That is how everything else will refer to it.

## Step 2 — The smallest thing that works

Put exactly this in the file:

```yaml
type: notice
title: "Hello"
ok-button:
  label: "Close"
```

Three ideas, and that is the whole language:

- **`type`** — what shape of screen this is. `notice` means "some text and one button".
- **`title`** — the heading at the top.
- **`ok-button`** — the single button a `notice` has. `label` is the words on it.

Save it, then in-game:

```
/ddialogs reload
/ddialogs open mymenu
```

A screen appears. You made a dialog.

## Step 3 — Add some text

The title is one line. Real text goes in the **body**:

```yaml
type: notice
title: "Hello"

body:
  - type: text
    text: "Welcome to the server!"
    width: 300

ok-button:
  label: "Close"
```

The `- ` before `type: text` matters — it means "this is one item in a list", and the body is a list because you can have many lines.

`width` is how wide the line is allowed to be before it wraps, in pixels. 300 is comfortable.

:::tip[YAML is picky about spaces]
Indentation must be **spaces, never tabs**, and lines at the same level must line up exactly. If a dialog refuses to load, this is the first thing to check — the console tells you which line.
:::

## Step 4 — Colour it

Colours use MiniMessage tags. A tag turns something on, and `</...>` turns it off:

```yaml
title: "<gold><b>Hello</b></gold>"
text: "<gray>Welcome, <white>friend</white>. Enjoy your stay."
```

Useful ones: `<red>` `<green>` `<blue>` `<yellow>` `<gold>` `<aqua>` `<gray>` `<white>` `<dark_gray>`, plus `<b>` for bold and `<i>` for italic. There is also `<gradient:#5BE585:#2C99F8>text</gradient>` if you want to show off.

## Step 5 — Say the player's name

```yaml
text: "<gray>Welcome back, <white>%player_name%</white>."
```

`%player_name%` is a **placeholder** — it is replaced with the name of whoever is looking at the screen. A handful work with nothing installed: `%player_name%`, `%player_world%`, `%player_health%`, `%server_online%` and more. See [Placeholders](/plugins/ddialogs/features/placeholders).

## Step 6 — Buttons that do things

A `notice` only has one button. Switch to **`multi_action`** to get a grid:

```yaml
type: multi_action
title: "<gold><b>Server menu</b></gold>"
columns: 2

body:
  - type: text
    text: "<gray>Welcome back, <white>%player_name%</white>."
    width: 300

buttons:
  - label: "<green>Spawn"
    tooltip: "<gray>Teleport to spawn"
    width: 150
    actions:
      - "[player] spawn"
      - "[close]"

  - label: "<aqua>Who is online"
    width: 150
    actions:
      - "[player] list"

exit-button:
  label: "<gray>Close"
  width: 100
  actions:
    - "[close]"
```

What is new:

- **`columns: 2`** — the grid is two buttons wide. They fill left, right, left, right.
- **`buttons`** — a list. Each `- label:` starts a new button.
- **`tooltip`** — the little box shown on hover.
- **`actions`** — what happens when pressed, **in order, top to bottom**.
- **`exit-button`** — a special button centred underneath the grid.

### The action tags

Each action starts with a tag in square brackets:

| Tag | Does |
|---|---|
| `[player] spawn` | runs `/spawn` **as the player**, with their permissions |
| `[console] give ...` | runs it as the **server** — powerful, be careful |
| `[message] <green>Hi` | sends a chat message to that player only |
| `[sound] entity.player.levelup` | plays a sound |
| `[dialog] otherfile` | opens another dialog |
| `[back]` | goes back to the previous dialog |
| `[close]` | shuts the screen |

There are thirteen in total — see [Buttons & actions](/plugins/ddialogs/features/buttons-and-actions).

:::caution[`[console]` runs with full server power]
Never put text a player typed into a `[console]` action. Use `[player]` unless you specifically need the server's permissions.
:::

## Step 7 — Give it a command

Right now you open it with `/ddialogs open mymenu`. Give it a real command:

```yaml
open:
  command: mymenu
```

Now `/mymenu` works. **Commands only register at startup, so restart the server** — a reload will not do it.

Want it restricted?

```yaml
open:
  command: mymenu
  permission: myserver.menu
```

## Step 8 — A second screen, and going back

Make a second file, `myrules.yml`:

```yaml
type: notice
title: "<gold><b>Rules</b></gold>"

body:
  - type: text
    text: "<yellow><b>1. Be decent</b>"
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<yellow><b>2. No cheating</b>"
    width: 320

ok-button:
  label: "<gray>Back"
  actions:
    - "[back]"
```

Then add a button to `mymenu.yml` that opens it:

```yaml
  - label: "<yellow>Rules"
    width: 150
    actions:
      - "[dialog] myrules"
```

That is a **sub-dialog**. `[dialog] myrules` opens the file `myrules.yml`, and `[back]` in that file returns to wherever the player came from — dDialogs remembers the trail for you, so the same Rules page works no matter which menu opened it.

An empty `text: ""` is a deliberate blank line. That is how you get spacing.

## Step 9 — Ask the player something

Inputs put fields on the screen. Whatever the player typed comes back as `$(key)`:

```yaml
type: multi_action
title: "<green><b>Send feedback</b></green>"
columns: 1

inputs:
  - key: msg
    type: text
    label: "Your message"
    max-length: 200

buttons:
  - label: "<green>Send"
    width: 220
    actions:
      - "[console] mail send Admin $(msg)"
      - "[message] <green>Thanks!"
      - "[close]"
```

`key: msg` names the field, and `$(msg)` is where its contents land. There are four input types — text, checkbox, dropdown and slider. See [Inputs](/plugins/ddialogs/features/inputs).

:::note[The value only arrives when a button is pressed]
Nothing reads a field while the player types. That is why a search box needs two steps — see [Dynamic lists](/plugins/ddialogs/features/dynamic-lists).
:::

## Step 10 — Add an icon

```yaml
label: "<item:diamond> <white>Shop"
```

`<item:diamond>` draws the diamond icon inline. Also `<head:%player_name%>` for a player's face and `<sprite:block/stone>` for block textures.

:::caution[Blocks are not items]
A *block* has no flat icon — Minecraft renders a 3D model for it. `<item:gold_block>` draws a pink missing-texture square. Use `<sprite:block/gold_block>` for blocks. Same trap for chests, beds, shields and clocks. [Icons](/plugins/ddialogs/features/icons) has a verified list.
:::

## When something goes wrong

| What you see | What it means |
|---|---|
| The dialog does not appear at all | It did not parse. The console names the file, the key and what it expected |
| `/mycommand` says unknown | Commands register at startup — restart, do not reload |
| A placeholder shows as `%…%` | PlaceholderAPI is missing, or that expansion is not installed. Test with `/papi parse me %…%` |
| A button does nothing | Its command does not exist here. The console lists every such button at startup, and pressing it now tells the player instead of failing silently |
| An icon is a pink square | It is a block or an animated item — see step 10 |
| The dialog appears **in chat** instead of on screen | The server could not encode it. Look for `Dialog backend failed to render` in the console and read to the **end** of that message |
| Blank rows in a leaderboard | Add `skip-empty: true` |

`/ddialogs list` shows every dialog that loaded. If yours is not there, it did not parse.

## Where next

- [Dialog types](/plugins/ddialogs/features/dialog-types) — all four shapes and when to use each
- [Examples](/plugins/ddialogs/examples) — 21 working files, one per feature
- [Menu patterns](/plugins/ddialogs/menu-patterns) — how real servers lay out a menu tree
- [Writing dialogs](/plugins/ddialogs/writing-dialogs) — every key, in one place
