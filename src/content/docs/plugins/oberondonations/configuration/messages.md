---
title: "messages.yml"
description: "Everything the plugin says in response to a command. Player-facing announcements (a purchase, a Hype Train level, a goal milestone) live in…"
---

Everything the plugin says in response to a command. Player-facing **announcements** (a purchase, a Hype Train level, a goal milestone) live in `announcements.yml` instead — this file is purely command output, and uses `{brace}` placeholders throughout.

## The Framework block — read this before touching it

```yaml
players-only: '<#FF5555>Only a player can run this command.'
console-only: '<#FF5555>Only the console can run this command.'
unknown-command: '<#FF5555>Unknown command. Try <#FFFFFF>/donations help<#FF5555>.'
invalid-usage: '<#FF5555>Usage: <#FFFFFF>%usage%'
invalid-number: "<#FF5555>'%input%' is not a valid number."
player-ambiguous: "<#FF5555>'%name%' matches more than one player: <#FFFFFF>%players%<#FF5555>. Type a bit more of the name."
reload-failed: '<#FF5555>Reload failed — check the console for details.'
command-error: '<#FF5555>Something went wrong running that command — check the console.'
```

These exact key names are looked up **directly by OberonCore itself** — argument parsing, permission checks, and other framework-level problems — not by this plugin's own command code, and core substitutes `%percent%` placeholders rather than this file's usual `{brace}` convention. If OberonCore asks for one of these exact names and it is missing, the raw key name is shown in chat as literal text instead of a real message — that is precisely what a plain `invalid-number` appearing in red in someone's chat means: the key is simply absent from the file. Keep every one of these defined, with the exact names and `%placeholders%` shown above.

Also worth knowing: **never write a bare `on:` or `off:` as a YAML key.** YAML parses those as the booleans `true`/`false`, not as text, and the path silently never resolves. Quote them (`'on':`) if you ever need a literal key by that name.

## Everything else

```yaml
prefix: ''
no-permission: "<#FF5555>You don't have permission to use this."
player-not-found: '<#FF5555>Player not found.'

reload-success: '<#4ADE80>OberonDonations configuration reloaded.'

sync-started: '<#555555>Store sync started…'
sync-already-running: '<#FF5555>A store sync is already running.'
sync-success: '<#4ADE80>Sync complete — imported {imported}, skipped {skipped}.'
sync-failed: '<#F87171>Store sync failed — check console and API keys.'
sync-no-credentials: '<#F87171>No store API keys configured. Use /donations setsecret tebex <key>.'

rebuild-started: '<#94A3B8>Rebuilding donor statistics…'
rebuild-success: '<#34D399>Rebuilt {count} donors and refreshed the boards.'

setsecret-saved: '<#4ADE80>Saved {type} secret.'
setsecret-unknown: '<#FF5555>Unknown secret type.'

trigger-success: '<#4ADE80>Simulated a purchase for {player}. This announces only; it does not deliver a package.'
trigger-failed: '<#FF5555>Could not store the simulated purchase.'

consent-prompt: '<#AAAAAA>You purchased {product}. Announce it in chat?'
consent-yes: '<#4ADE80>[Yes]'
consent-no: '<#F87171>[No]'
consent-accepted: '<#4ADE80>Your purchase will be announced. Thank you for your support!'
consent-declined: '<#555555>Your purchase stays private.'
consent-none-pending: '<#F87171>No purchase is waiting for your confirmation.'

stats-none: '<#AAAAAA>{player} has no recorded purchases.'
stats-line: '<#C21807>{player} <#AAAAAA>— spent <#00FC00>{spent}<#AAAAAA> over <#FFFFFF>{count}<#AAAAAA> purchases, streak <#FFFFFF>{streak}'

top-header: '<#C21807>Top donors <#AAAAAA>({metric}, {period})'
top-line: '<#555555>#{rank} <#FFFFFF>{player} <#555555>— <#00FC00>{value}'
top-empty: '<#AAAAAA>No donations recorded yet.'

goal-list-empty: '<#AAAAAA>No goals configured.'
goal-not-found: '<#FF5555>No goal with that id.'
goal-reset-success: '<#4ADE80>Goal {goal} reset — progress counts from now.'
goal-refreshed: '<#4ADE80>Goals refreshed.'

hype-none: '<#AAAAAA>No hype train is running.'
hype-started: '<#4ADE80>Hype train started.'
hype-stopped: '<#4ADE80>Hype train stopped.'
hype-cannot-start: '<#FF5555>Could not start — one is running, or no levels are configured.'

gg-none: '<#AAAAAA>No GG wave is running.'
gg-started: '<#4ADE80>GG wave started.'
gg-stopped: '<#4ADE80>GG wave closed.'
gg-already-running: '<#FF5555>A GG wave is already running.'

board-created: '<#4ADE80>Board {board} created here.'
board-removed: '<#4ADE80>Board {board} removed.'
board-moved: '<#4ADE80>Board {board} moved here.'
board-not-found: '<#FF5555>No board with that id.'
board-list-empty: '<#AAAAAA>No donation boards configured.'
board-list-line: '<#555555>- <#C21807>{board}<#555555> · {renderer} · {metric} · {period} · rank {rank} · {world}'
board-refreshed: '<#4ADE80>Refreshed {count} boards.'
board-cleanup: '<#4ADE80>Removed {count} leftover board entities.'
board-world-missing: '<#FF5555>That board''s world is not loaded.'
board-in-game-only: '<#FF5555>Run this in game — the board is placed where you stand.'
```

## See also

- [Commands & Permissions](/plugins/oberondonations/commands-and-permissions/)
- [FAQ](/plugins/oberondonations/faq/#a-raw-key-like-invalid-number-shows-up-in-chat-instead-of-a-real-message)
