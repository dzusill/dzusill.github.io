---
title: "The Plan Board"
description: "A shared noticeboard only your own faction can see. A member presses Write a Note, receives a"
---

A shared noticeboard only your own faction can see. A member presses **Write a Note**, receives a
real book and quill, writes whatever they like and signs it — the signed book becomes a note on the
board that every member can open and read.

Open it with `/f notes` (aliases `/f note`, `/f board`), or from the **Plan Board** button in the
main `/f` menu. It is on by default; turn it off with `enabled: false` in `notes.yml`.

## Writing a note

Minecraft has no way for a plugin to open the book *writing* screen, so writing really does mean
holding a book and quill. Pressing **Write a Note** hands you one, and signing it pins the note to
the board.

The draft book is a loan, not an item you keep:

| Situation | What happens |
|---|---|
| You try to drop it | Refused |
| You try to store it in any chest, ender chest or team chest | Refused |
| You die holding it | It does not drop |
| You log out holding it | Taken back |
| You leave it unfinished for `draft-timeout-minutes` (10 by default) | Taken back |
| Your inventory is full when you press Write | Refused, with a message — never dropped on the floor |

You can only hold one draft at a time. The signature is never actually applied: on success the note
is stored and the book taken back, and if the note is refused you keep a still-writable book with
every word you typed, so a rejected word costs you an edit rather than the whole page.

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
