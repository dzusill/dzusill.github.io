---
title: "Permissions"
description: "It is deliberately not part of use. Staff who run drops all day can drop the notification node and"
---

| Node | Default | Grants |
|---|---|---|
| `oberonenvoys.use` | everyone | `/envoy`, `/envoy active`, `/envoy stats` |
| `oberonenvoys.preview` | everyone | `/envoy preview` |
| `oberonenvoys.next` | everyone | `/envoy next` |
| `oberonenvoys.locate` | everyone | `/envoy locate` |
| `oberonenvoys.top` | everyone | `/envoy top` |
| `oberonenvoys.notify` | everyone | Receives drop announcements, titles and the boss bar |
| `oberonenvoys.admin` | operator | `force`, `spawn`, `open`, `clear`, `zone`, `reload`, and coordinates in `/envoy active` |

## Why `notify` is separate

It is deliberately not part of `use`. Staff who run drops all day can drop the notification node and
keep every command — otherwise the only way to stop three chat lines an hour is to lose access to the
commands as well.

Revoking it removes the chat announcement, the title and the boss bar for that player. The beam, the
hologram and the crate itself are world state and stay visible to everyone.

## Delegating

Each player-facing subcommand has its own node, so a rank can lose the leaderboard while keeping the
preview, or vice versa.

The staff subcommands all share `oberonenvoys.admin`. They are destructive in the same way —
`spawn` puts a block in the world, `open` hands out its loot early, `clear` takes several out, `zone`
and `reload` change what the scheduler does next — so splitting them further would be more
configuration than protection.
