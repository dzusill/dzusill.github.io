---
title: "Menu patterns"
description: "The screens published servers actually ship — the big menu, toggle rows, amount pickers, locked slots — and the reasoning behind the ones that look arbitrary."
---

[Writing dialogs](/plugins/ddialogs/writing-dialogs) is the reference for individual keys. This page is about **which shape to reach for**, and why real menus look the way they do.

Numbers in brackets point at the [worked example](/plugins/ddialogs/examples).

## The rule underneath all of them

> **A dialog is rendered once, when it opens, and nothing in it can change afterwards.**

Every pattern below is a consequence of that one sentence. A setting that appears to toggle is a screen thrown away and rebuilt. A list that appears to filter is the same screen reopened with a stored term. There is no reactivity, no pagination, no conditional — and once you stop looking for them, the layouts get simpler rather than harder.

## The big menu [13]

Two columns of plain buttons, no body text, no icons.

```yaml
type: multi_action
title: ""
columns: 2
buttons:
  - { label: "<white>Homes", width: 150, actions: ["[player] homes"] }
  - { label: "<white>RTP",   width: 150, actions: ["[player] rtp"] }
```

Three things that are easy to get wrong:

**Reading order is down the pairs, not across.** `columns: 2` fills left, right, left, right, so buttons 1 and 2 are the top row. Group each pair so the halves belong together — Homes and RTP are both travel, Sell and Pay are both money. An alphabetical list looks arbitrary once the client lays it out.

**Give every button the same width.** Vanilla sizes each to its label otherwise, and a grid of slightly different widths reads as broken.

**Skip the icons here.** Fourteen pictures is busier than none, and the plain version is what real servers ship. Icons earn their place on a *short* menu of similar-sounding words — the next pattern.

An empty `title: ""` hides the header bar entirely, which is right when the buttons are the whole screen.

## A category hub [14]

Six or seven categories, each opening a smaller screen. Here icons help: similar-length words are hard to tell apart at a glance and a picture in front of each fixes it.

The odd one out goes on `exit-button:` — with six buttons filling three rows exactly, a seventh would sit alone in the left cell and look like a mistake. The footer is the only centred cell vanilla gives you, so it reads as deliberate.

## Toggle rows [15]

The most useful pattern here, and worth understanding rather than copying.

```yaml
columns: 1
buttons:
  - label: "<white>Public Chat: %myplugin_chat_public%"
    width: 320
    actions:
      - "[player] settings toggle public-chat"
      - "[dialog] my-settings-chat"        # this dialog's own id
```

The label states the value; pressing it flips the value and reopens the screen. `[player]` runs its command immediately and `[dialog]` is deliberately deferred one tick, so the command has finished before the new screen reads the value. **Put them in that order and it works.**

**Colour must come from the placeholder.** This is the mistake everyone makes:

```yaml
label: "<green>Public Chat: %myplugin_chat_public%"   # wrong — OFF is also green
label: "<white>Public Chat: %myplugin_chat_public%"   # right — expansion returns "<green>ON"
```

A dialog has no conditionals. It prints what the placeholder hands it, so the plugin that owns the setting is the only thing that can know which colour the value should be. If you own that plugin, return it pre-coloured. If you do not, live with one colour for both states.

**A third state is a cycle, not a toggle.** `Anyone → Friends → Nobody → Anyone` is the same button; the command advances by one each press. The dialog neither knows nor cares how many states there are.

Use `columns: 1` and full width — settings are read as a list, and `Private Messages: Friends/Followed` needs the room.

## Confirmations [16]

The mechanics are in [Dialog types](/plugins/ddialogs/features/dialog-types#confirmation); the wording is what decides whether players click the right one.

**Name the consequence.** "Are you sure?" tells the player nothing. "Are you sure you want to randomly teleport with another player?" means the answer is obvious without remembering which menu they came from.

**Green proceeds, red does nothing** — never colour a destructive confirm green just because it is the affirmative one.

**Deny should usually be `[back]`, not `[close]`.** The player got here from a menu; closing drops them into the world and makes them reopen it.

## Amounts: presets, then a field [17][18]

Paying, depositing, buying — the same screen every time. Four one-press amounts and a `Custom` button that opens a second dialog with a single text field.

**Not just a field**, because most payments are a round number and a field costs a click, typing and a submit. **Not a slider**, because `number_range` is for values where approximately right is fine, and nobody wants to drag to exactly $22.

Pick presets that are not round: 2 / 11 / 22 / 100 covers far more real transfers than 10 / 50 / 100 / 500.

Put the target in the title — `<head:Name> Name` — so the body never repeats it and two open menus cannot be confused.

On the typed screen, set `max-length` to something sane. A number needs ten characters; the default 128 invites a pasted paragraph.

## A player list, then a card [19]

A list is for choosing, a card is for reading; trying to do both gives you neither.

**Placeholders resolve against the player looking at the screen, not the player you clicked.** A card opened with `[dialog]` shows the viewer's own stats. Two ways round it:

1. Build the card with `dynamic-body` from placeholders that take a name, if your expansion offers them.
2. Run `"[player] stats $(player_name)"` and let your stats plugin open its own screen.

The second is one line, always works, and is what most servers do.

On the card itself, stat lines are **body text, not buttons** — they are not clickable and should not look it. Blank lines between them are the design: four stats packed together read as a paragraph, spaced out each is a fact.

## Search, filter, and the empty case [20]

```yaml
footer-buttons:
  - label: "<item:spyglass> <white>Search"
    actions: ["[filter] $(name)", "[dialog] my-list"]
  - label: "<item:barrier> <white>Show all"
    actions: ["[filter] ", "[dialog] my-list"]      # trailing space clears it
```

Searching is two steps because a dialog cannot filter as you type — a field's contents only reach the server when a button is pressed.

**Put the controls on `footer-buttons`, not in the list.** Footer buttons always render; dynamic rows may not. If the list carried the only buttons, an empty result would be a blank screen with no way out.

**Put the count in the title.** `Friends  0 friends / 0 following` answers "is this loading or genuinely empty?" before the player has to wonder.

## Slots and locks [21]

Homes, plot slots, backpack pages. Three states in one row: owned, empty, locked behind a rank. Two separate problems, and mixing them up is why this screen is hard.

**What the slot says** is per player and a static file cannot know it, so the label is a placeholder and the owning plugin decides the text — including its colour.

**Whether the slot is allowed** is a permission, and dialogs handle that natively with `permission:` plus `deny-actions:`.

The honest limit: `deny-actions` changes what pressing a button does, **not how it draws**. Full detail on [Permissions & locks](/plugins/ddialogs/features/permissions).

**"Show More" is a second file.** Dialogs have no pagination.

## Leaderboards [8][12]

A hub is just a category hub whose categories are boards, and three columns fits six boards without scrolling. See [Leaderboards](/plugins/ddialogs/features/leaderboards).

## When a dialog turns up in chat

A dialog that renders as chat lines was never sent to the client. The server builds the screen, hands it to the vanilla codec to encode, and if the codec refuses, the caller drops the whole thing to a chat prompt:

```
[dDialogs] Dialog backend failed to render for <player>; falling back
java.lang.RuntimeException: Failed to encode input: ... ; <the actual reason>
```

**Read to the end of that message** — the reason is appended after a long dump of the dialog object, and it names the exact field.

The trap that causes it in practice is `<head:%some_placeholder%>` on a server without that expansion: PlaceholderAPI leaves the `%...%` verbatim, so the head is asked for a player called `%ajlb_lb_..._name%` and the encoder rejects the name. dDialogs now drops an icon whose target is not valid rather than letting it fail the screen, so this should not reach you — but a badly-formed value in another field still can.

One more thing: **a single failure also costs you the next few dialogs.** The caller invalidates the backend when a render throws, so dialogs opened after it go to chat too until it is resolved again. One bad screen looks like several broken ones.

## What none of these can do

- **React.** No value on screen updates without reopening the dialog.
- **Filter as you type.** Field contents reach the server only on a button press.
- **Paginate.** Page two is another file, or another `[filter]`.
- **Branch.** No conditionals. A placeholder that returns a pre-coloured, pre-worded value is how you get one.
- **Show another player's placeholders.** They resolve against the viewer.
