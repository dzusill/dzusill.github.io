---
title: "All 26 examples"
description: "Every worked example that ships with dDialogs — what each teaches, its command, and the YAML that matters."
---

dDialogs ships 26 examples, one per feature. On a fresh install they are copied into `dialogs/` as **live, working dialogs**, so you can press them rather than only read them.

Pristine copies always live in `plugins/dDialogs/.example-configs/`, rewritten on every start so an upgrade brings you the current set. Copy out of there; do not edit inside it.

## The whole set

| # | Teaches | Open with |
|---|---|---|
| 1 | [The smallest dialog](#1--notice) | `/ddialogs open 01-notice` |
| 2 | [A yes/no question](#2--confirmation) | `/ddialogs open 02-confirmation` |
| 3 | [A grid of buttons](#3--multi-action) | `/examplemenu` |
| 4 | [All four input types](#4--inputs) | `/ddialogs open 04-inputs` |
| 5 | [Every action tag](#5--actions) | `/ddialogs open 05-actions` |
| 6 | [Opening other dialogs](#6--sub-dialogs) | `/examplehub` |
| 7 | [One button per online player](#7--player-list) | `/ddialogs open 07-player-list` |
| 8 | [A leaderboard from placeholders](#8--leaderboard) | `/ddialogs open 08-leaderboard` |
| 9 | [Icons](#9--icons) | `/ddialogs open 09-icons` |
| 10 | [Permissions and locked buttons](#10--permissions) | `/exampleperms` |
| 11 | [A long text page](#11--text-page) | `/ddialogs open 11-text-page` |
| 12 | [A leaderboard with nothing installed](#12--live-leaderboard) | `/ddialogs open 12-live-leaderboard` |
| 13 | [The big two-column menu](#13--menu-grid) | `/bigmenu` |
| 14 | [A category hub](#14--settings-hub) | `/settingshub` |
| 15 | [Settings rows that toggle](#15--toggle-rows) | `/togglerows` |
| 16 | [A confirmation worth reading](#16--confirm-danger) | `/confirmdemo` |
| 17 | [Preset amounts](#17--amount-picker) | `/amountdemo` |
| 18 | [One typed value](#18--typed-amount) | `/typedamount` |
| 19 | [Player list, then a card](#19--player-cards) | `/playercards` |
| 20 | [Search, filter and empty states](#20--search-and-filter) | `/searchdemo` |
| 21 | [Slots and locks](#21--slots-and-locks) | `/slotsdemo` |
| 22 | [Telling the next screen what was picked](#22--dialog-parameters) | `/paramdemo` |
| 23 | [Categories from another plugin](#23--tickets) | `/ticketmenu` |
| 24 | [A form built from those questions](#24--ticket-form) | opened by 23 |
| 25 | [A cached list, and why](#25--my-tickets) | `/mytickets` |
| 26 | [Sending a form to a plugin](#26--suggest-and-report) | `/suggestdemo` |

:::note[23–26 need dPhalanx]
They are the only examples that depend on another plugin. Without it they still **open** — the lists are simply empty and the console names the source that went unanswered, which is what any missing source looks like.
:::

:::tip[Start with 1, 3, 6]
Example 1 is the whole language in six lines. Example 3 is a menu. Example 6 links them together. After those three you can build most things.
:::

---

## 1 — notice

**The smallest complete dialog.** One block of text, one button.

```yaml
type: notice
title: "<gold><b>Welcome</b></gold>"

body:
  - type: text
    text: "<gray>Hi <white>%player_name%</white>. This is the whole file — nothing else is required."
    width: 300

ok-button:
  label: "<green>Got it"
  actions:
    - "[message] <gray>You pressed the button."
```

A `notice` has exactly one button and it lives under `ok-button`.

## 2 — confirmation

**A yes/no question.** Two buttons, named by role so you cannot get them the wrong way round.

```yaml
type: confirmation
title: "<red><b>Delete your base?</b></red>"

body:
  - type: text
    text: "<gray>This cannot be undone."

confirm-button:
  label: "<red>Delete it"
  actions:
    - "[message] <red>Gone."
    - "[sound] entity.generic.explode"

deny-button:
  label: "<gray>Keep it"
  actions:
    - "[message] <green>Nothing changed."
```

## 3 — multi-action

**A grid of buttons.** This is what a menu is.

```yaml
type: multi_action
title: "<aqua><b>A little menu</b></aqua>"
columns: 2

open:
  command: examplemenu

buttons:
  - label: "<item:ender_pearl> <white>Spawn"
    tooltip: "<gray>Shown when you hover"
    width: 150
    actions: ["[player] spawn", "[close]"]

  - label: "<item:redstone> <white>Ping"
    width: 150
    actions: ["[player] ping"]

exit-button:
  label: "<gray>Close"
  width: 100
  actions: ["[close]"]
```

`columns` sets the grid width. `exit-button` is the footer — it sits *below* the grid rather than inside it, which is why it is a separate key.

## 4 — inputs

**All four input types on one screen**, with a button that echoes back what you entered.

```yaml
type: multi_action
title: "<green><b>All four input types</b></green>"
columns: 1

inputs:
  - key: nick
    type: text
    label: "A short text field"
    max-length: 16
    initial: "Steve"

  - key: notes
    type: text
    label: "A big text box"
    max-length: 500
    height: 80              # any height makes it multiline

  - key: gift
    type: boolean
    label: "A checkbox"
    initial: true

  - key: reason
    type: single_option
    label: "A picker"
    options:
      - { id: spam, display: "<red>Spam", initial: true }
      - { id: rude, display: "<yellow>Rudeness" }

  - key: amount
    type: number_range
    label: "A slider"
    start: 1
    end: 64
    step: 1
    initial: 8

buttons:
  - label: "<green>Show me what I entered"
    width: 220
    actions:
      - "[message] <gray>text=<white>$(nick)</white> box=<white>$(notes)</white>"
      - "[message] <gray>checkbox=<white>$(gift)</white> picker=<white>$(reason)</white> slider=<white>$(amount)</white>"

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

Press the button and read the chat — the fastest way to understand what `$(key)` gives you.

## 5 — actions

**Every action tag, one per button.** Press them and watch what each does.

```yaml
type: multi_action
title: "<yellow><b>Every action tag</b></yellow>"
columns: 2

buttons:
  - label: "Message"
    actions: ["[message] <green>Just for you."]

  - label: "Broadcast"
    actions: ["[broadcast] <gold>Everyone sees this."]

  - label: "Action bar"
    actions: ["[actionbar] <aqua>Above your hotbar"]

  - label: "Title"
    actions: ["[title] <gold>Big text;<gray>and a subtitle"]

  - label: "Sound"
    actions: ["[sound] entity.player.levelup 1.0 1.2"]

  - label: "Run as me"
    tooltip: "<gray>Uses YOUR permissions"
    actions: ["[player] spawn"]

  - label: "Run as console"
    tooltip: "<gray>Uses the SERVER's permissions — be careful"
    permission: "ddialogs.admin"
    actions: ["[console] say hello from console"]
    deny-actions: ["[message] <red>Admins only."]

  - label: "Wait, then act"
    actions:
      - "[message] <gray>Watch this..."
      - "[delay] 40"
      - "[message] <green>...two seconds later."

  - label: "Open another dialog"
    actions: ["[dialog] 01-notice"]

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

## 6 — sub-dialogs

**A hub that opens other dialogs.** This is how a menu tree works.

```yaml
type: multi_action
title: "<light_purple><b>A hub</b></light_purple>"
columns: 1

open:
  command: examplehub

buttons:
  - label: "<item:book> Rules"
    actions: ["[dialog] 11-text-page"]

  - label: "<item:paper> Go to the inputs example"
    actions: ["[dialog] 04-inputs"]

  - label: "<item:writable_book> Go to the notice example"
    actions: ["[dialog] 01-notice"]

exit-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

`[dialog]` opens a file by its id, so any dialog can lead to any other, as deep as you like.

## 7 — player list

**One button per online player**, built when the dialog opens. Includes the two-step search.

```yaml
type: multi_action
title: "<gold><b>Who is online</b></gold>"
columns: 3

inputs:
  - key: search
    type: text
    label: "Search"
    max-length: 16

dynamic-list:
  source: online_players      # also: online_players_all, worlds
  template:
    - label: "<head:$(player_name)> <white>$(player_name)"
      tooltip: "<gray>In $(player_world)"
      width: 150
      actions:
        - "[player] msg $(player_name) hi"
        - "[close]"

footer-buttons:
  - label: "<item:spyglass> Search"
    actions:
      - "[filter] $(search)"
      - "[dialog] 07-player-list"

  - label: "<item:barrier> Show all"
    actions:
      - "[filter] "
      - "[dialog] 07-player-list"

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

## 8 — leaderboard

**A top-10 from ranked placeholders.** Needs PlaceholderAPI plus a leaderboard expansion.

```yaml
type: notice
title: "<red><b><item:iron_sword> Top killers</b></red>"

body:
  - type: text
    text: "<dark_gray>──────────────────────"
    width: 300

dynamic-body:
  source: placeholder
  count: 10                   # how many ranks to try
  skip-empty: true            # drop ranks nobody holds yet
  width: 300
  fields:
    name:  "%ajlb_lb_statistic_player_kills_$(i)_alltime_name%"
    value: "%ajlb_lb_statistic_player_kills_$(i)_alltime_value%"
  template: "<red>#$(i) <head:$(name)> <white>$(name) <gray>— <red>$(value) kills"

ok-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

Nothing installed? **Example 12 is the same screen from a live source** and works on a bare server.

## 9 — icons

**Pictures inside text**, including the trap.

```yaml
type: notice
title: "<white>Icons"

body:
  - type: text
    text: "<gray>An item: <item:diamond> <item:golden_apple> <item:ender_pearl>"
  - type: text
    text: "<gray>A block texture: <sprite:block/dirt> <sprite:block/emerald_block>"
  - type: text
    text: "<gray>A GUI sprite: <sprite:minecraft:gui:widget/button>"
  - type: text
    text: "<gray>Your own head: <head:%player_name%>"
  - type: text
    text: ""
  - type: text
    text: "<dark_gray>Careful: a BLOCK has no item texture — its inventory icon is a rendered model."
  - type: text
    text: "<dark_gray><item:gold_block> is a pink square; <sprite:block/gold_block> is right."

ok-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

The last two lines are deliberately showing the broken form next to the correct one.

## 10 — permissions

**Three places a permission can sit.** See [Permissions & locks](/plugins/ddialogs/features/permissions) for the full explanation.

```yaml
type: multi_action
title: "<gray><b>Permissions</b></gray>"
columns: 1

open:
  command: exampleperms
  permission: ddialogs.admin      # without this, /exampleperms says no

buttons:
  - label: "<green>Anyone can press this"
    actions: ["[message] <green>Hello."]

  - label: "<yellow>Admins only"
    permission: ddialogs.admin
    actions: ["[message] <green>You are an admin."]
    deny-actions: ["[message] <red>You are not."]

  - label: "<aqua>Guarded halfway through"
    actions:
      - "[message] <gray>This always runs."
      - "[permission] ddialogs.admin"
      - "[message] <green>This only runs for admins."

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

## 11 — text page

**A rules page.** The template for anything long: numbered headings, blank spacers, a divider, one consistent width.

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
    text: "<yellow><b>2. No cheating</b>\n<gray>Hacked clients, x-ray, auto-clickers and macros are all bans."
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<dark_gray>─────────────────────────────"
    width: 320
  - type: text
    text: "<gray>Punishments escalate: <white>warning → mute → temporary ban → permanent ban</white>."
    width: 320

ok-button:
  label: "<gray>Back"
  width: 100
  actions: ["[back]"]
```

Best starting point for rules, info and changelog screens: a button opens it, it has no commands to break, and its single button goes `[back]` to wherever the player came from.

## 12 — live leaderboard

**The same shape as example 8, with nothing installed.** Open this one first.

```yaml
type: notice
title: "<aqua><b>Online now</b></aqua>"

body:
  - type: text
    text: "<gray>%server_online%<dark_gray>/<gray>%server_max_players% <gray>players"
    width: 300
  - type: text
    text: "<dark_gray>──────────────────────"
    width: 300

dynamic-body:
  source: online_players_all
  width: 300
  # No fields: a live source brings its own. No count: the rows decide.
  template: "<aqua>#$(i) <head:$(player_name)> <white>$(player_name) <gray>— <dark_aqua>$(player_world)"

ok-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

## 13 — menu grid

**The big two-column menu** most published servers use. Worth studying for what it does *not* do: no body text, no icons, no tooltips.

```yaml
type: multi_action
title: ""                       # empty: no header bar
columns: 2

open:
  command: bigmenu

buttons:
  - label: "<white>Homes"
    width: 150
    actions: ["[player] homes"]

  - label: "<white>RTP"
    width: 150
    actions: ["[player] rtp"]

  # ...twelve more, all width 150
```

Reading order is **down the pairs, not across** — buttons 1 and 2 are the top row. Give every button the same width, or the grid looks broken.

## 14 — settings hub

**A category hub.** Six categories plus a centred seventh.

```yaml
type: multi_action
title: "<white>Settings"
columns: 2

body:
  - type: text
    text: "<white>Choose a category to change your settings"
    width: 320

buttons:
  - label: "<item:oak_sign> <white>Chat"
    tooltip: "<gray>Who can message you, and what you see in chat."
    width: 150
    actions: ["[dialog] 15-toggle-rows"]

  - label: "<item:bell> <white>Notifications"
    width: 150
    actions: ["[dialog] 15-toggle-rows"]

  # ...four more

# The seventh, centred under the grid rather than orphaned in a row of its own.
exit-button:
  label: "<item:comparator> <white>General"
  width: 150
  actions: ["[dialog] 15-toggle-rows"]
```

## 15 — toggle rows

**The most useful pattern here.** Every "Public Chat: OFF" row on a published server is this.

```yaml
type: multi_action
title: "<white>Settings – Chat"
columns: 1

buttons:
  - label: "<white>Public Chat: %myplugin_chat_public%"
    width: 320
    actions:
      - "[player] settings toggle public-chat"
      - "[dialog] 15-toggle-rows"      # this dialog's own id
```

The label states the value; pressing it flips the value and rebuilds the screen. `[player]` runs immediately, `[dialog]` is deferred one tick — so the command finishes before the new screen reads the value.

The shipped file also has a **row that really works on a bare server**: it shows `%player_gamemode%` and cycles it with a vanilla command, so you can watch the mechanism.

:::caution[Colour must come from the placeholder]
`<green>Chat: %state%` colours OFF green too. A dialog has no conditionals — the plugin that owns the setting must return the value pre-coloured.
:::

## 16 — confirm danger

**A confirmation worth reading.** The mechanics are example 2; this is about the wording.

```yaml
type: confirmation
title: ""                       # the question lives in the body
pause: true

body:
  - type: text
    text: "<white>Are you sure you want to randomly teleport with another player?"
    width: 320

confirm-button:
  label: "<green>Yes"
  width: 150
  actions:
    - "[sound] entity.enderman.teleport"
    - "[player] rtp player"
    - "[close]"

deny-button:
  label: "<red>No"
  width: 150
  actions: ["[back]"]
```

Deny uses `[back]`, not `[close]` — the player came from a menu and should return to it.

## 17 — amount picker

**Preset amounts, with a way out.** Four one-press buttons and a Custom that opens example 18.

```yaml
type: multi_action
title: "<head:%player_name%> <white>%player_name%"
columns: 2

body:
  - type: text
    text: "<white>Choose an amount to pay"
    width: 320

buttons:
  - label: "<green>$ 2"
    width: 150
    actions: ["[player] pay %player_name% 2", "[close]"]

  - label: "<green>$ 11"
    width: 150
    actions: ["[player] pay %player_name% 11", "[close]"]

  # ...$22 and $100

  - label: "<white>Custom"
    width: 150
    actions: ["[dialog] 18-typed-amount"]

exit-button:
  label: "<gray>Back"
  width: 150
  actions: ["[back]"]
```

Pick presets that are **not round**: 2 / 11 / 22 / 100 covers far more real transfers than 10 / 50 / 100 / 500.

## 18 — typed amount

**One field, one job.** The Custom half of example 17.

```yaml
type: multi_action
title: ""
columns: 1

body:
  - type: text
    text: "<white>Type the amount to pay %player_name%"
    width: 320

inputs:
  - key: amount
    type: text
    label: "<white>Amount"
    max-length: 10
    width: 320

buttons:
  - label: "<green>Continue"
    width: 320
    actions:
      - "[player] pay %player_name% $(amount)"
      - "[close]"

exit-button:
  label: "<gray>Back"
  width: 320
  actions: ["[back]"]
```

`max-length: 10` is a real defence — a number needs ten characters, and the default 128 invites a pasted paragraph.

## 19 — player cards

**A list is for choosing, a card is for reading.** Trying to do both gives you neither.

```yaml
type: multi_action
title: ""
columns: 2

body:
  - type: text
    text: "<white>Click a player to view their stats"
    width: 320

dynamic-list:
  source: online_players_all
  template:
    - label: "<head:$(player_name)> <white>$(player_name)"
      tooltip: "<gray>In $(player_world)"
      width: 150
      actions:
        - "[player] stats $(player_name)"
        - "[close]"

footer-buttons:
  - label: "<gray>+ Add Player to List"
    width: 150
    actions: ["[dialog] 20-search-and-filter"]

exit-button:
  label: "<gray>Back"
  width: 150
  actions: ["[back]"]
```

:::caution[A card cannot show the person you clicked]
Placeholders resolve against the **viewer**, so a card opened with `[dialog]` shows your own stats whoever you picked. Run a command and let the stats plugin open its own screen — that is what the example does.
:::

## 20 — search and filter

**Everything a list needs when it might be empty.**

```yaml
type: multi_action
title: "<white>Friends  <gray>%server_online% online"
columns: 2

inputs:
  - key: name
    type: text
    label: "<white>Player name"
    max-length: 16
    width: 320

dynamic-list:
  source: online_players
  template:
    - label: "<head:$(player_name)> <white>$(player_name)"
      width: 150
      actions: ["[player] msg $(player_name) hi", "[close]"]

footer-buttons:
  - label: "<item:hopper> <white>Filter"
    tooltip: "<gray>Click to change:  All · Friends · Following · Followers"
    width: 150
    actions:
      - "[player] friends filter next"
      - "[dialog] 20-search-and-filter"

  - label: "<item:spyglass> <white>Search"
    width: 150
    actions:
      - "[filter] $(name)"
      - "[dialog] 20-search-and-filter"

  - label: "<item:barrier> <white>Show all"
    width: 150
    actions:
      - "[filter] "              # trailing space clears it
      - "[dialog] 20-search-and-filter"

exit-button:
  label: "<gray>Close"
  width: 150
  actions: ["[close]"]
```

The controls sit on `footer-buttons` because those always render — dynamic rows may not. If the list carried the only buttons, an empty result would be a blank screen with no way out.

## 21 — slots and locks

**Owned, empty, and locked behind a rank** — homes, plots, backpack pages.

```yaml
type: multi_action
title: ""
columns: 4

buttons:
  - label: "%myplugin_home_1%"
    tooltip: "<gray>Left click to travel."
    width: 110
    actions: ["[player] home 1", "[close]"]

  - label: "%myplugin_home_4%"
    tooltip: "<gray>Slot 4 needs VIP."
    width: 110
    permission: "myplugin.homes.4"
    actions: ["[player] home 4", "[close]"]
    deny-actions:
      - "<red>Slot 4 is locked. <gray>Ranks unlock more home slots."
      - "[sound] block.note_block.bass"

footer-buttons:
  - label: "<white>Show More"
    width: 110
    actions: ["[dialog] page-two"]
```

Placeholder for the **text**, permission for the **behaviour**. Neither substitutes for the other, and "Show More" is a second file — dialogs have no pagination.

---

## 22 — dialog parameters

**Telling the next screen what was picked.** Opens itself with a parameter, which is the "pick a tab" pattern.

```yaml
body:
  - type: text
    text: "<gray>Currently picked: <white>$(picked)"

dynamic-list:
  source: worlds
  template:
    - label: "<white>$(world_name)"
      actions:
        - "[dialog] 22-dialog-parameters picked=$(world_name)"
```

Before anything is pressed the body reads literally, as `$(picked)` — the token is left alone rather than blanked, so you can see the difference between "no parameter" and "an empty one". See [Dialog parameters](/plugins/ddialogs/features/parameters).

---

## 23 — tickets

**Categories another plugin owns.** The list is not in the file; the icon, name and description all come from the row.

```yaml
dynamic-list:
  source: phalanx_ticket_categories
  template:
    - label: "<item:$(category_material)> <white>$(category_name)"
      tooltip: "<gray>$(category_description)"
      actions:
        - "[dialog] 24-ticket-form category=$(category_id)"
```

Nothing here needs editing when a category is added on the website.

---

## 24 — ticket form

**One file for every category.** The questions of whichever category was pressed become the fields.

```yaml
dynamic-inputs:
  source: phalanx_ticket_questions
  template:
    key: "$(q_key)"
    label: "$(q_text)"
    max-length: "$(q_max)"
    height: "$(q_height)"
    required: "$(q_required)"

buttons:
  - label: "<green><b>Submit</b></green>"
    actions:
      - "[call] phalanx_ticket_create $(category)"
    on-success:
      - "[message] <green>Ticket <white>#$(result_number)</white> opened."
    on-failure:
      - "[message] <red>$(result_error)"
```

`q_height` absent means a single-line field, present means a paragraph box. This is the example to read for both [dynamic inputs](/plugins/ddialogs/features/dynamic-inputs) and [`[call]`](/plugins/ddialogs/features/external-plugins).

---

## 25 — my tickets

**A cached list, and the reason it has to be one.** The data lives on a website; a source runs on the main thread every time the screen opens.

```yaml
dynamic-list:
  source: phalanx_my_tickets
  template:
    - label: "<white>#$(ticket_number) <gray>— $(ticket_subject)"
      tooltip: "<gray>$(ticket_category) · <white>$(ticket_status)</white>"
      actions:
        - "[player] ticket view $(ticket_number)"
        - "[close]"

footer-buttons:
  - label: "<yellow>Refresh"
    actions:
      - "[dialog] 25-my-tickets refreshed=yes"
```

The plugin answers instantly with what it last saw and refreshes behind the screen, so the first open can show nothing and a Refresh button earns its place.

---

## 26 — suggest and report

**The simplest shape a `[call]` takes** — nothing dynamic at all, because the questions never change.

```yaml
inputs:
  - key: suggestion
    label: "Your suggestion"
    height: 60
    required: true
    min-length: 10

buttons:
  - label: "<aqua>Send suggestion"
    actions: ["[call] phalanx_suggest"]
    on-success:
      - "[message] <green>Sent. Thanks."
    on-failure:
      - "[message] <red>$(result_error)"
```

Two things to send means two buttons — which is also the rule, since one `[call]` per button is what keeps `on-success` unambiguous.

---

## Where to go next

- [Menu patterns](/plugins/ddialogs/menu-patterns) — how these combine into a real menu tree
- [Writing dialogs](/plugins/ddialogs/writing-dialogs) — every key in one reference
