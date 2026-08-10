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
| `/oberonchat history <player>` | `oberonchat.admin` | The player's recent offences. |
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
