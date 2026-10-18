---
title: "config.yml"
description: "/sus reload applies every change except command and storage, which need a restart. Durations are written like 30s, 10m, 6h, 7d, 2w. A bad value is reported…"
---

`/sus reload` applies every change except `command` and `storage`, which need a restart. Durations are written like `30s`, `10m`, `6h`, `7d`, `2w`. A bad value is reported in the console with its path, and the default is used instead.

| Key | Default | What it does |
| --- | --- | --- |
| `time-zone` | `system` | Time zone for dates in menus and exports, e.g. `Europe/Bratislava` |
| `command.name` / `aliases` | `sus` / `[suspicious, sentry]` | The command (restart) |
| `command.enabled` | `true` | `false` = no command at all; alerts and Discord still work (restart) |
| `list.default-window` | `24h` | Window the list opens with |
| `list.windows` | `[1h, 6h, 24h, 7d]` | Windows of the clock button. The largest is also how long flag counts stay in memory |
| `list.default-sort` | `NEWEST` | `NEWEST`, `MOST_FLAGS`, `SCORE`, `RISK` or `NAME` |
| `list.refresh-debounce` | `1s` | Open lists redraw at most this often |
| `list.online-only-by-default` | `false` | Start with only online players |
| `list.reset-filters-on-open` | `true` | Every `/sus` by command starts from the defaults above. `false` = each staff member keeps their sort, window, filters and search until a restart |
| `list.search-input` | `DIALOG` | `DIALOG` = search box on screen (1.21.6+ clients, others get chat), `CHAT` = always in chat |
| `alerts.enabled` | `true` | Silent in-game alerts |
| `alerts.min-interval` | `10s` | Minimum time between two alerts about one player (a higher level always alerts) |
| `teleport.vanish-first` | `true` | Vanish before teleporting |
| `teleport.allow-offline` | `false` | Teleport to where an offline player's last flag fired |
| `freeze.allowed-commands` | `[msg, r, tell, helpop]` | Commands a frozen player may still use (first word, no slash) |
| `freeze.invulnerable` | `true` | Frozen players take no damage |
| `freeze.remind-every` | `3s` | How often the "frozen" title is shown again |
| `freeze.quit-commands` | `[]` | Console commands when a frozen player logs out. `{player} {uuid} {staff}`, e.g. `'tempban -s {player} 7d Logged out while frozen'` |
| `freeze.quit-alert` | `true` | Tell staff with `oberonsentry.alerts` when a frozen player logs out |
| `spectate.first-person` | `false` | Look through the target's eyes instead of floating next to them, from any game mode |
| `evidence.enabled` / `before` / `after` | `true` / `10s` / `5s` | The movement timeline around a flag that opens or raises a case |
| `client-scan.enabled` | `true` | [Client detection](/plugins/oberonsentry/features/client-detection/) on join |
| `client-scan.delay-ticks` | `40` | How long after the join to evaluate (channels keep registering) |
| `privacy.ip-logging` | `false` | Store a salted hash of the IP (never the address) |
| `privacy.ip-salt` | `change-me` | Set your own random value before you turn IP logging on |
| `debug.fake-flags` | `false` | Allows `/sus debug` test flags. Keep off in production |
| `debug.log-flags` | `false` | Print every incoming flag to the console |

## vanish

Used by teleport and spectate. See [Staff actions](/plugins/oberonsentry/features/actions/#vanish).

| Key | Default | What it does |
| --- | --- | --- |
| `vanish.premiumvanish` | `true` | Use PremiumVanish, through its API, when it is installed |
| `vanish.enable-command` / `disable-command` | `''` | Without PremiumVanish: another vanish plugin's commands, run as the staff member (no slash). Empty = none |
| `vanish.fallback-hide` | `false` | When nothing above vanished the staff member, hide them from everyone without `oberonsentry.see-vanished`. `false` = no vanish at all |

## punishments

Kick, mute and ban through LiteBans. See [Staff actions](/plugins/oberonsentry/features/actions/#kick-mute-ban).

| Key | Default | What it does |
| --- | --- | --- |
| `punishments.run-as-staff` | `true` | Run the command as the staff member, so LiteBans records them and checks their rights. `false` = the console runs it |
| `punishments.console-reason` | `{reason} (by {staff})` | Reason format when the console runs the command |
| `punishments.silent` | `true` | `{silent}` becomes LiteBans' `-s`, so only staff see the broadcast. Only added while LiteBans is installed |
| `punishments.commands.kick` | `kick {silent} {player} {reason}` | Without LiteBans, kick is always a plain kick |
| `punishments.commands.ban` / `tempban` | `ban {silent} {player} {reason}` / `tempban {silent} {player} {duration} {reason}` | |
| `punishments.commands.mute` / `tempmute` | `mute {silent} {player} {reason}` / `tempmute {silent} {player} {duration} {reason}` | |
| `punishments.history-command` | `history {player}` | Run as the staff member when they click Punishments in a profile. Empty = no click |
| `punishments.confirm` | ban, tempban, mute, tempmute, kick, dismiss | Actions that ask "Are you sure?" (also possible: `resolve`) |
| `punishments.confirm-enabled` | `true` | Switch all confirmations off |

Command placeholders: `{silent} {player} {uuid} {reason} {duration} {staff}`. An empty command switches that action off (an empty kick falls back to a plain kick).

## discord

Off until you set a webhook. Setup and events are on [Discord](/plugins/oberonsentry/features/discord/).

| Key | Default | What it does |
| --- | --- | --- |
| `discord.enabled` | `false` | Send anything to Discord |
| `discord.webhook-url` | `''` | The default webhook. Empty = Discord off |
| `discord.alerts-webhook-url` | `''` | `case-high`, `case-critical`, `vulcan-punishment`, `client-detection`. Empty = `webhook-url` |
| `discord.actions-webhook-url` | `''` | `freeze`, `unfreeze`, `frozen-logout`, `kick`, `mute`, `ban`, `case-status`. Empty = `webhook-url` |
| `discord.username` / `avatar-url` | `OberonSentry` / `''` | Name and picture the messages are posted with. Empty avatar = the webhook's own |
| `discord.role-ping.role-id` | `''` | Role mentioned by events with `ping-role: true` (`case-critical`). Empty = no ping |
| `discord.colors.*` | `default`, `none`, `low`, `medium`, `high`, `critical` | Embed colour per risk level, for events with `color: risk` |
| `discord.footer` | `OberonSentry` | Footer of every embed. Empty = none |
| `discord.timestamp` | `true` | Show the time of the event under the embed |
| `discord.queue-size` | `100` | Messages waiting to be sent. When Discord is down and this is full, new ones are dropped |
| `discord.events.<event>` | | `enabled`, `title`, `description`, `color`, `fields`, `ping-role` per event |

Embed placeholders:

| Placeholder | Value |
| --- | --- |
| `{player}` `{uuid}` `{platform}` | The player, and Java or Bedrock |
| `{check}` `{check_name}` `{check_type}` `{category}` `{anticheat}` | The check that fired, e.g. `Reach (A)`, `combat` |
| `{vl}` `{max_vl}` `{info}` `{experimental}` | Violation level, Vulcan's punishment threshold, Vulcan's info text |
| `{ping}` `{tps}` `{cps}` | At the moment of the flag |
| `{world}` `{x}` `{y}` `{z}` `{coords}` | Where the player was (`{coords}` = `world 12, 64, -30`) |
| `{case_id}` `{case_command}` `{status}` `{risk}` `{score}` `{assignee}` | The case (`{case_command}` = `/sus case 12`) |
| `{top_checks}` | The checks that weigh most in the score, one per line (`reactions.discord-contributors` in `score.yml`) |
| `{staff}` `{reason}` `{duration}` `{action}` | Staff actions and punishments |
| `{client}` `{version}` | Client brand and version |
| `{rule}` `{confidence}` `{kind}` `{value}` | Client detections |

## retention

Old data is deleted once a day. Values are days, `0` = keep forever.

| Key | Default | Data |
| --- | --- | --- |
| `retention.flags` | `30` | Individual flags and client detections |
| `retention.flag-counts` | `180` | Per-minute flag counts |
| `retention.evidence` | `90` | Evidence timelines |
| `retention.audit` | `365` | Audit log |
| `retention.profiles` | `365` | Profiles of players with no flag and no case, counted from their last visit |

## storage (restart)

| Key | Default | What it does |
| --- | --- | --- |
| `storage.queue-capacity` | `10000` | Flags waiting for the database. When it is full, new flags are still counted but not stored in full |
| `storage.flush-every` | `2s` | How often queued flags are written (one transaction) |

`database.yml` holds the H2 file name. Only H2 is supported.
