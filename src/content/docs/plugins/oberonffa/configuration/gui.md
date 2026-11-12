---
title: "gui.yml"
description: "Three menus: main (/ffa), pass (/ffa pass <id>) and claim (/ffa claim). Each has title"
---

Three menus: `main` (`/ffa`), `pass` (`/ffa pass <id>`) and `claim` (`/ffa claim`). Each has `title`
(MiniMessage; `{page}` `{pages}` `{pass}` `{player}`), `rows` (1–6), `filler` (`item`, `name`,
`custom-model-data`, `slots: all | bottom-row | [ "0-8" ]`) and `items`.

`items` holds the menu's buttons **and** any number of your own decorative items under any other name —
they are drawn first, so a button in the same slot wins.

Every item takes `material` (or `head:<player name>`, `head:<base64 texture>`; `""` switches it off),
`slot` / `slots` (`13`, `[ 45, 53 ]`, `[ "0-8" ]`; `-1` hides it), `name`, `lore`, `amount`,
`custom-model-data`, `glow`, `flags`, `sound` (an alias from sounds.yml) and, for `previous` / `next`,
`unavailable` (what shows when there is no page that way).

## main

Buttons: `stats` (`{player}` `{streak}` `{kills_<period>}` `{best_<period>}`), `daily`
(`{daily_kills}` `{daily_total}` `{daily_left}` `{daily_state}`), `claim` (`{count}`), `close`. Passes are
placed by passes.yml.

## pass

Buttons: `info`, `previous`, `next`, `back`, `close` (`{pass}` `{progress}` `{period}` `{claimable}`).
`tier-slots` lists where tiers go (more tiers than slots = pages). `states.locked | claimable | claimed`
set each tier's look with `{tier}` `{needed}` `{progress}` `{bar}` `{rewards}`; `reward-line` formats
each line of `{rewards}`; `progress-bar` has `length`, `filled`, `empty`.

## claim

Buttons: `previous`, `next`, `claim-all`, `info`, `back`, `close`, `empty` (`{count}`). `content-slots`
(empty = every row above the bottom one) and `item-lore` (added under each stored item).

The claim menu is take-only (shift-click and double-click into it are blocked), refused inside the arena,
and closed if the player is moved into the arena with it open.
