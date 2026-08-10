---
title: "Commands & Permissions"
description: "Base command /oberonchat, aliases /ochat and /oc. Four subcommands, four bypass nodes."
---

Base command `/oberonchat`, aliases `/ochat` and `/oc`.

## Commands

| Command | Permission | Description |
|---|---|---|
| `/oberonchat` | — | Show the usage list. |
| `/oberonchat alerts` | `oberonchat.alerts` | Silence or restore **your own** filter alerts. |
| `/oberonchat reload` | `oberonchat.admin` | Reload `config.yml`, `filter.yml` and `messages.yml`. |
| `/oberonchat check <text>` | `oberonchat.admin` | Run the live filter over a phrase and report what it found. |
| `/oberonchat history <player> [page] [filters]` | `oberonchat.admin` | The player's offences, ten to a page. See [Paged logs](#paged-logs). |
| `/oberonchat clear <player>` | `oberonchat.admin` | Wipe their running total and stored history. |

The root command carries **no** permission and each subcommand gates itself. That is what lets a moderator holding
only `oberonchat.alerts` reach `/oberonchat alerts`, without being handed the whole admin surface to get there.

### `alerts` — a personal switch, not a permission change

```
/oberonchat alerts
```

Stored per player, so it survives a relog. The alternative would be asking an admin to revoke and re-grant the
permission every time somebody wants a quiet shift.

### `check` is the one to remember

```
/oberonchat check what a muppet
```

Reports the rule that fired, what would happen, the violation weight and the resulting text. It runs with **no permissions**, so the answer describes the rules rather than the person asking — an admin with `oberonchat.bypass.filter` still sees what a normal player would get.

This is how you verify a rule without a second account and without anybody swearing in public chat.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonchat.admin` | op | `reload`, `check`, `history` and `clear`. |
| `oberonchat.alerts` | op | **Receive** staff alerts when a rule fires, and use `/oberonchat alerts`. |
| `oberonchat.bypass.filter` | false | Skip the word filter. |
| `oberonchat.bypass.caps` | false | Skip the caps check. |
| `oberonchat.bypass.spam` | false | Skip cooldown, flood and duplicate. |
| `oberonchat.bypass.length` | false | Skip the message length limit. |
| `oberonchat.bypass.*` | false | All four bypasses. |
| `oberonchat.*` | op | Everything above. |

A bypassed check **never runs** — it is not merely ignored afterwards. Staff with a spam bypass never see a wait.

### Suggested setup

Out of the box only ops can do anything, and nobody receives alerts. **`oberonchat.alerts` is the important one** —
with automatic punishment shipped off, alerts are how anything reaches your team at all.

```
/lp group mod permission set oberonchat.alerts true
/lp group admin permission set oberonchat.admin true
```

Bypasses are deliberately `false` by default, including for ops. Grant them narrowly:

```
/lp group admin permission set oberonchat.bypass.spam true
```

> Think twice before granting `oberonchat.bypass.filter` to a whole staff group. It is the node that makes a staff member's slur invisible to the filter *and* absent from the history — which is exactly the record you would want if it ever came up.

## Tab completion

Every subcommand and both player arguments tab-complete. `check` does not, because it takes free text.

## Paged logs

`/oberonchat history` prints one page at a time rather than a wall of text. Under the list is a footer you click:

```
  « Prev   Page 2/7   Next »
```

Clicking re-runs the command for that page — so the buttons keep working after a relog, and after a reload. You
can also just type the number:

```
/oberonchat history Steve 3
```

### Narrowing it

Paging through a month of entries to find one is not much better than scrolling. Three flags cut the list down,
and they combine:

| Flag | What it takes | Example |
|---|---|---|
| `--since` | how far back, or a date | `--since 7d`, `--since 2026-08-01` |
| `--until` | the other end of the window | `--until 24h`, `--until 2026-08-05 18:00` |
| `--find` | text to look for | `--find discord.gg` |

```
/oberonchat history Steve --since 7d --find discord.gg
```

Times are relative (`30m` `6h` `7d` `2w`) or absolute (`2026-08-01`, `2026-08-01 14:30`, server time). `--find`
is case-insensitive and matches the rule that tripped and the text the player typed.

The filters survive a page turn — clicking Next keeps whatever you narrowed to, so page two is page two of the
same list.

A flag it cannot read is refused outright rather than quietly ignored:

```
Could not read that filter: --since yesterday
   try --since 7d, --until 2026-08-01 or --find text
```

That is deliberate. Reading a full log while believing it was filtered is the one outcome worth stopping.

### Page size

`Log-Page-Size` in `config.yml`, ten by default — chat holds about twenty lines. Capped at 50 whatever you put
there. The Prev/Next wording lives under `paging` in `messages.yml` and can be reworded or translated like
everything else.
