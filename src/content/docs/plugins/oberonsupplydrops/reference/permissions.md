---
title: "Permissions"
description: "It is deliberately not part of use. Staff who run drops all day can drop the notification node and"
---

| Node | Default | Grants |
|---|---|---|
| `oberonsupplydrops.use` | everyone | `/supplydrop`, `/supplydrop active`, `/supplydrop stats` |
| `oberonsupplydrops.preview` | everyone | `/supplydrop preview` |
| `oberonsupplydrops.next` | everyone | `/supplydrop next` |
| `oberonsupplydrops.locate` | everyone | `/supplydrop locate` |
| `oberonsupplydrops.top` | everyone | `/supplydrop top` |
| `oberonsupplydrops.notify` | everyone | Receives drop announcements, titles and the boss bar |
| `oberonsupplydrops.admin` | operator | `spawn`, `clear`, `zone`, `reload`, and coordinates in `/supplydrop active` |

## Why `notify` is separate

It is deliberately not part of `use`. Staff who run drops all day can drop the notification node and
keep every command — otherwise the only way to stop three chat lines an hour is to lose access to the
commands as well.

Revoking it removes the chat announcement, the title and the boss bar for that player. The beam, the
hologram and the crate itself are world state and stay visible to everyone.

## Delegating

Each player-facing subcommand has its own node, so a rank can lose the leaderboard while keeping the
preview, or vice versa.

The staff subcommands all share `oberonsupplydrops.admin`. They are destructive in the same way —
`spawn` puts a block in the world, `clear` takes several out, `zone` and `reload` change what the
scheduler does next — so splitting them further would be more configuration than protection.
