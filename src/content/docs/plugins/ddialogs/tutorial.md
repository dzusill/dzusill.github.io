---
title: "Make your first dialog"
description: "No Java, no restarts, no plugin knowledge. Ten minutes."
---

No Java, no restarts, no plugin knowledge. Ten minutes.

## Where things are

After the first start you have:

```
plugins/DDialogs/
├── dialogs/              ← your dialogs live here. One file = one dialog.
└── .example-configs/     ← one worked example per feature. Copy from here.
```

The `.example-configs` folder is **reference only** — nothing in it is loaded. It is rewritten every start, so upgrading gives you examples for whatever was added. Copy a file out of it into `dialogs/`, rename it, and it becomes real.

## 1. The smallest possible dialog

Create `plugins/DDialogs/dialogs/hello.yml`:

```yaml
type: notice
title: "<gold>Hello"
ok-button:
  label: "<green>Close"
```

In game:

```
/ddialogs reload
/ddialogs open hello
```

That is a complete dialog. The **id** is the filename without `.yml`, so this one is `hello`.

## 2. Give it a command

```yaml
type: notice
title: "<gold>Hello"

open:
  command: hello        # now /hello opens it

ok-button:
  label: "<green>Close"
```

> Commands are registered when the server **starts**. Adding a `command:` needs a restart — everything else in the file reloads with `/ddialogs reload`.

## 3. Make it do something

```yaml
ok-button:
  label: "<green>Take me to spawn"
  actions:
    - "[message] <gray>Off you go."
    - "[sound] entity.enderman.teleport"
    - "[player] spawn"
    - "[close]"
```

Actions run top to bottom. `[player]` runs a command **as the player**, exactly as if they typed it, so their permissions apply.

If you mistype a tag — `[mesage]` — the server refuses the file at startup and lists the valid ones. It will not silently give you a dead button.

## 4. Ask a question

Change `type` to `confirmation` and give it two named buttons:

```yaml
type: confirmation
title: "<red>Really?"

body:
  - type: text
    text: "<gray>This cannot be undone."

confirm-button:
  label: "<red>Do it"
  actions: ["[message] <red>Done."]

deny-button:
  label: "<gray>Never mind"
  actions: ["[message] <green>Nothing happened."]
```

The buttons have **names**, so you cannot get their order wrong.

## 5. Build a menu

```yaml
type: multi_action
title: "<aqua>My menu"
columns: 2

open:
  command: mymenu

buttons:
  - label: "<item:ender_pearl> Spawn"
    actions: ["[player] spawn", "[close]"]

  - label: "<item:book> Rules"
    actions: ["[dialog] hello"]      # opens another dialog by its id

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

`[dialog] <id>` is how menus connect. In the dialog you jump to, use `[back]` for its back button rather than naming a destination — otherwise a screen reachable from two menus sends half your players to the wrong one.

## 6. Ask for input

```yaml
inputs:
  - key: who
    type: text
    label: "Player"
    max-length: 16

  - key: amount
    type: number_range
    label: "How much"
    start: 1
    end: 1000
    initial: 100

buttons:
  - label: "<green>Pay"
    actions: ["[player] pay $(who) $(amount)"]
```

Whatever the player enters comes back as `$(key)`.

**Keys must be letters, digits or underscore.** `player-name` is refused when the file loads — Minecraft itself rejects it, so it is better to hear about it at startup than to wonder why the screen never opens.

## 7. A list of players

```yaml
type: multi_action
title: "<gold>Who is online"
columns: 3

dynamic-list:
  source: online_players
  template:
    - label: "<head:$(player_name)> $(player_name)"
      actions: ["[player] tpa $(player_name)", "[close]"]
```

One button per online player, each with their face, built fresh every time the dialog opens.

Adding a search box takes two steps, and this is the part people expect to work differently:

```yaml
inputs:
  - { key: search, type: text, label: "Search" }

footer-buttons:
  - label: "Search"
    actions:
      - "[filter] $(search)"
      - "[dialog] my-player-list"     # this dialog's own id
```

A dialog **cannot filter while you type** — the contents of a field only reach the server when a button is pressed. So searching is: store the term, reopen the screen, list comes back narrowed.

## 8. A leaderboard

One player per line, with their head. This needs **PlaceholderAPI** plus an expansion that provides ranked placeholders.

```yaml
type: notice
title: "<red>Top killers"

dynamic-body:
  source: placeholder
  count: 10
  skip-empty: true
  fields:
    name:  "%ajlb_lb_statistic_player_kills_$(i)_alltime_name%"
    value: "%ajlb_lb_statistic_player_kills_$(i)_alltime_value%"
  template: "<red>#$(i) <head:$(name)> <white>$(name) <gray>— <red>$(value)"

ok-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

**How `$(i)` works.** It is the row number. Row 3 turns

```
%ajlb_lb_statistic_player_kills_$(i)_alltime_name%
```

into

```
%ajlb_lb_statistic_player_kills_3_alltime_name%
```

which PlaceholderAPI then expands. One pattern, ten placeholders — instead of writing ten near-identical lines.

**`skip-empty: true` matters.** On a server with three players, ranks 4–10 resolve to nothing. Without it you get seven blank lines; with it they disappear.

**Use your own placeholders.** Run `/papi list` to see which expansions you have, and `/papi parse me %some_placeholder%` to test one before putting it in a file. If the whole leaderboard is missing, that placeholder is not resolving — check it with `/papi parse` first.

> `dynamic-body` writes **text lines**. `dynamic-list` writes **buttons**. A top-10 as ten buttons looks wrong and invites clicks that do nothing, which is why they are separate.

## 9. Icons

```yaml
text: "<item:diamond> a diamond, <sprite:block/dirt> some dirt, <head:%player_name%> you"
```

Needs a 1.21.9+ client; older ones show nothing rather than breaking the dialog.

One trap: a **block** has no item texture — its inventory icon is a rendered model, not a picture. `<item:gold_block>` gives a pink square. Use `<sprite:block/gold_block>`.

## When something is wrong

| What you see | What it means |
|---|---|
| The dialog does not appear at all | Check the console at startup: a file with an error is skipped and the message names the file and the key |
| `/mycommand` says unknown | Commands register at startup. Restart, do not reload |
| A placeholder shows as `%…%` | PlaceholderAPI is missing, or that expansion is not installed. Test with `/papi parse me %…%` |
| A button does nothing | Its command probably does not exist. Try typing the command yourself |
| An icon is a pink square | Wrong texture path — see step 9 |
| Blank rows in a leaderboard | Add `skip-empty: true` |

`/ddialogs list` shows every dialog that loaded. If yours is not there, it did not parse — the console says why.

## Next

- [Writing dialogs](/plugins/ddialogs/writing-dialogs/) — the full reference: every key, every action tag, every input option
- `.example-configs/` — a working file for each feature, ready to copy
