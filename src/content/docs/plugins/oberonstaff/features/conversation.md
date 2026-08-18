---
title: "Conversation"
description: "Talking inside a ticket, and reading the whole thread in chat — paged, clickable, newest first, with rank prefixes."
---

A ticket is a conversation. Both sides write into it, every action taken on it is recorded beside what was said, and the whole thing can be read in chat without opening a menu.

---

## Writing in a ticket

Two ways in, both ending in the same place:

```
/ticket chat 4        enter chat mode — everything you type goes into #4
/ticket leave         stop
/ticket reply 4 …     one line, without entering the mode
```

Or click **Write a message** in `/ticket view 4` (staff: **Reply**). The menu closes, because you cannot type with an inventory open.

While in chat mode your lines do **not** reach public chat. Typing `leave` as a plain message works as well as the command — somebody deep in a ticket should not have to remember which it was.

Each line is echoed back to you:

```
[#4] you: my chest was full of diamonds
```

That echo exists because the line has just been taken out of public chat and the notification router deliberately never tells you about your own action. Without it, writing into a ticket looks exactly like the message being swallowed.

Chat mode is a session, not a setting: it ends when you log out, and when the ticket closes.

:::note[Staff notes are separate]
`/tickets note 4 …` writes a line only staff can read. It is filtered out in SQL rather than hidden at display time, and the player is never notified about one. It has its own sound too, so a staff member can hear that a line went in as a note and not as a reply — that is the mistake worth catching.
:::

---

## Reading the whole thread

```
/ticket thread 4          the conversation, newest first
/ticket thread 4 2        page 2
/tickets thread 4         staff — same thing, plus internal notes
```

Aliases: `log`, `history`.

Or click the thread item in the ticket's detail menu. A tooltip cannot scroll and a menu cannot hold forty lines, so the menu shows the tail and the click opens the rest in chat where it pages.

**Prev** and **Next** are clickable and re-run the command for that page. They are built from the command's configured name, so renaming `/tickets` renames what the buttons run.

### Why newest first

A long thread is one whose recent end matters. Somebody opening it came to read what just happened, not to start at the beginning — so page one is the newest lines and page nine is history.

### Who may read it

| | Reads the thread | Sees internal notes |
|---|---|---|
| The person who opened the ticket | yes | no |
| Anybody following it | if `Allow-Followers` | no |
| Staff | yes | yes |
| Everybody else | no | — |

Followers can be shut out with `Allow-Followers: false`, leaving only the owner and staff.

---

## Actions appear beside the replies

Claiming, assigning, changing priority or category, closing, reopening, auto-closing, punishing and rating all write a line into the thread. "Who claimed this and when" belongs in the same list as what was said, not on a separate screen.

Every one of those lines is yours to reword in `messages.yml`:

```yaml
thread:
  action:
    claimed: "<#5DADE2>%staff%<gray> claimed this ticket"
    released: "<gray>%staff% released this ticket"
    assigned: "<#5DADE2>%staff%<gray> assigned this to <#5DADE2>%target%"
    priority: "<gray>%staff% set priority to <white>%priority%"
    category: "<gray>%staff% moved this to <white>%category%"
    closed: "<gray>%staff% closed this ticket<dark_gray>: <gray>%reason%"
    reopened: "<green>%staff%<gray> reopened this ticket"
    auto-close-warning: "<yellow>No reply for a while — this closes itself in about a day unless somebody answers."
    auto-closed: "<gray>Closed automatically after <white>%days%<gray> days with no reply"
    punished: "<dark_red>%staff%<gray> ran <dark_gray>/<gray>%command%"
    merged: "<gray>%player% reported this too"
    escalated: "<red>%count% people have reported this<gray> — priority is now <white>%priority%"
    rated: "<gold>%player% rated this <white>%stars%"
    rated-comment: "<gold>%player% rated this <white>%stars%<gray>: %comment%"
```

Two entries for a rating rather than one with an optional `%comment%`: a template written for "always present" leaves a dangling colon when nobody wrote one.

:::caution[These are rendered when written]
Editing an action's wording changes **new** lines. Lines already in a thread keep the words they were written with.

The alternative — storing a token and rendering it at display time — would reword history too, at the price of a schema change and a database nobody can read with a SQL client. For a ticket desk that is the wrong trade: an audit line that silently rewrites itself is worse than one that is dated.
:::

---

## How a line is drawn

One format per kind, so a staff reply can look different from a player's message:

```yaml
thread:
  view:
    header: "… <white>Ticket <#5DADE2>#%id% <dark_gray>· <gray>%first%<dark_gray>-<gray>%last% <gray>of <white>%total% …"
    player: "<dark_gray>[<gray>%time%<dark_gray>] %prefix%<white>%author%<dark_gray>: <gray>%body%"
    staff:  "<dark_gray>[<gray>%time%<dark_gray>] %prefix%<#5DADE2>%author%<dark_gray>: <white>%body%"
    note:   "<dark_gray>[%time%] %prefix%<#E67E22>%author% <dark_gray>(note)<dark_gray>: <gray>%body%"
    system: "<dark_gray>[%time%] <dark_gray>» <italic>%body%</italic>"
    empty:  "<prefix><gray>Nothing has been said on ticket <white>#%id%<gray> yet."
```

| Placeholder | |
|---|---|
| `%author%` | who wrote it |
| `%prefix%` | their rank prefix — see below |
| `%body%` | what was said |
| `%time%` | how long ago, as `4m` / `3h` / `2d` |
| `%id%` | the ticket number |

Delete `%prefix%` from one format to drop prefixes from that kind only.

A `system` line has no author: the name is already inside the action wording, and prefixing "Peter claimed this ticket" with Peter's rank would read as though the rank said it.

---

## Rank prefixes

```yaml
Tickets:
  Thread:
    Show-Prefixes: true
    Prefix-Placeholder: "%luckperms_prefix%"
    Max-Prefix-Length: 32
```

Read through **PlaceholderAPI**, not the LuckPerms API — so the plugin has no compile-time dependency on LuckPerms and this works with any permissions plugin that publishes a prefix placeholder:

```yaml
Prefix-Placeholder: "%luckperms_prefix%"    # the group's prefix
Prefix-Placeholder: "%vault_prefix%"        # via Vault
Prefix-Placeholder: "%luckperms_meta_tag%"  # a custom meta field
```

Needs PlaceholderAPI installed. Without it, prefixes are simply blank rather than an error.

Prefixes are cached per player and the cache is cleared on `/oberonstaff reload`, which is when a rank change would matter.

`Max-Prefix-Length` cuts a prefix longer than that. It is longer than it looks — rank prefixes carry colour codes — and exists to stop one absurd rank pushing the message off the screen.

---

## Page size

```yaml
Tickets:
  Thread:
    Page-Size: 8      # lines per page in chat.  3-20
    Gui-Lines: 10     # lines previewed in the menu item.  1-15
```

Both are clamped rather than refused. Paging is counted and read in two queries, so asking for page nine of a three-page thread lands on page three rather than returning nothing.

`Gui-Lines` is a preview on purpose. A tooltip has no scrollbar and Minecraft truncates a long one without saying so, which leaves the reader unable to tell whether they saw everything — so the item says how many lines it is hiding and points at `/ticket thread`.

Notes are excluded from a player's page **count** as well as their page, so they never get an empty last page where the notes would have been.

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/) — categories, the wizard, the queues
- [messages.yml](/plugins/oberonstaff/configuration/messages/) — every line on this page
- [Notifications](/plugins/oberonstaff/features/notifications/) — who is told when somebody writes
