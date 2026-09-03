---
title: "The Plan Board"
description: "A shared noticeboard only your own faction can see. A member presses Write a Note, receives a"
---

A shared noticeboard only your own faction can see. A member presses **Write a Note**, receives a
real book and quill, writes whatever they like and signs it — the signed book becomes a note on the
board that every member can open and read.

Open it with `/f notes` (aliases `/f note`, `/f board`), or from the **Plan Board** button in the
main `/f` menu. It is on by default; turn it off with `enabled: false` in `notes.yml`.

> **Upgrading?** The plugin never overwrites a `gui.yml` you already have, so the Plan Board button
> is merged into it on the first boot after updating — you will see a line in the console saying what
> was added. Your own entries are untouched, and a slot you already use is never taken. If you later
> delete the button, it stays deleted.

## Writing a note

Minecraft has no way for a plugin to open the book *writing* screen — the client opens it itself
when you use a writable book you are holding, and no packet can force it. So writing really does mean
holding a book and quill: pressing **Write a Note** puts one straight into your hand, and one
right-click opens the page. Signing it pins the note to the board.

The draft book is a loan, not an item you keep:

| Situation | What happens |
|---|---|
| You try to drop it | Refused |
| You try to store it in any chest, ender chest or team chest | Refused |
| You open any container | Taken back |
| You run any command | Taken back, before the command runs |
| You scroll to another hotbar slot | Taken back |
| You die holding it | It does not drop |
| You log out holding it | Taken back |
| It somehow reaches another player | Destroyed on sight |
| You close the writing screen without signing | Taken back — nothing is saved |
| You leave it unfinished for `draft-timeout-minutes` (10 by default) | Taken back |
| Your inventory is full when you press Write | Refused, with a message — never dropped on the floor |

The book exists only for the moment you are writing in it. Running a command is what closes the last
real gap: an auction, shop or kit plugin reads the item straight out of your hand without ever moving
it through an inventory slot, so the draft is taken back **before** any command runs — it cannot be
sold, traded or stored.

You can only hold one draft at a time, and whatever you were holding is put back in your hand once
the book is gone. Only a **signed** book becomes a note: close the screen without signing and the
book is handed straight back, so nothing is left in your inventory to carry around or duplicate.

The signature is never actually applied: on success the note is stored and the book taken back, and
if the note is refused you keep a still-writable book with every word you typed, so a rejected word
costs you an edit rather than the whole page.

## Reading and removing

**Left-click** a note to read it. It opens in the vanilla book screen — the same one its author
wrote it in, so it paginates and wraps exactly as they saw it.

**Right-click** a note to remove it, then confirm on the screen that follows. A removed note cannot
be recovered, which is why removal is never one click.

| Who | Can remove |
|---|---|
| The note's author | Their own notes, always |
| Officer / Owner | Any note on their faction's board |
| Any other member | Nothing |

Notes cannot be edited after signing. To change one, remove it and write it again.

## Limits

```yaml
# notes.yml
enabled: true
max-notes-per-faction: 50    # 0 = unlimited
max-pages: 100               # Minecraft's own ceiling
max-page-length: 1024        # Minecraft's own ceiling
max-title-length: 32         # Minecraft's own ceiling
draft-timeout-minutes: 10
```

The page, title and length caps are clamped to what Minecraft itself allows — raising them above the
vanilla ceilings has no effect, because the client refuses to write that much in the first place.

A board is **wiped when the faction disbands** and **moves to the surviving faction on a merge**: the
members who wrote those plans are joining the survivor, so their plans go with them.

## Layout

Every square on the board is yours to move, in `gui.yml`:

```yaml
gui:
  menus:
    notes:
      size: 54
      title: "<gold>Plan Board"
      border-material: GRAY_STAINED_GLASS_PANE
      entry-slots: [10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25]
      items:
        write:         { slot: 49, material: WRITABLE_BOOK, name: "<green><bold>Write a Note</bold></green>" }
        previous-page: { slot: 45, material: ARROW, name: "<yellow>« Previous" }
        next-page:     { slot: 50, material: ARROW, name: "<yellow>Next »" }
        close:         { slot: 53, material: STRUCTURE_VOID, name: "<red>Close" }
```

`entry-slots` is where notes are painted, in order, and it also decides how many fit on a page —
leave it out to use the whole inner area. Slots outside the inventory are ignored. Anything you omit
keeps its built-in default, and `/fa reload` applies the change without a restart.

## Anti-swear

An optional word list refuses a note containing a listed word. Nothing is saved and the player keeps
their book, so they can fix the word and sign again — the note is **refused, never censored**.

```yaml
# notes.yml
filter:
    enabled: true
    words: []          # ships empty
    normalize:
        case: true         # FuCk -> fuck
        repeats: true      # fuuuuck -> fuck
        leetspeak: true    # sh1t, @ss, $hit -> letters
        separators: true   # f.u.c.k, f u c k -> fuck
```

The list **ships empty on purpose**: no profanity list lives inside this plugin, and what counts as
unacceptable differs per server and per language. Until you add words, the filter does nothing.

Matching is **whole-word**. Listing `ass` refuses `ass` but leaves `assassin`, `class`, `grass` and
`Scunthorpe` alone — the trap most word filters fall into. The trade for that precision: inflections
are separate entries, so listing `fuck` does not by itself refuse `fucking`. List both.

The `normalize` steps are what stop the obvious ways around the list. Each can be switched off on its
own if it causes false positives on your server. Accents are always folded, so `fück` cannot smuggle
a word through.

## Permissions

`factions.cmd.notes` (default: true) covers the whole board — opening it, writing, reading and
removing your own notes. Removing someone else's is governed by faction rank, not by a permission
node.
