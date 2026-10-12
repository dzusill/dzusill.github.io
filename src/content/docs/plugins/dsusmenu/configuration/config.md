---
title: "config.yml"
description: "/sus reload applies every change except command and storage, which need a restart. Durations are written like 30s, 10m, 6h, 7d, 2w. A bad value is reported…"
---

`/sus reload` applies every change except `command` and `storage`, which need a restart. Durations are written like `30s`, `10m`, `6h`, `7d`, `2w`. A bad value is reported in the console with its path, and the default is used instead.

| Key | Default | What it does |
| --- | --- | --- |
| `time-zone` | `system` | Time zone for dates in menus and exports, e.g. `Europe/Bratislava` |
| `command.name` / `aliases` | `sus` / `[suspicious]` | The command (restart) |
| `command.enabled` | `true` | `false` = no command at all; alerts and Discord still work (restart) |
| `list.default-window` | `24h` | Window the list opens with |
| `list.windows` | `[1h, 6h, 24h, 7d]` | Windows of the clock button. The largest is also how long flag counts stay in memory |
| `list.default-sort` | `NEWEST` | `NEWEST`, `MOST_FLAGS`, `SCORE`, `RISK` or `NAME` |
| `list.refresh-debounce` | `1s` | Open lists redraw at most this often |
| `list.online-only-by-default` | `false` | Start with only online players |
| `alerts.enabled` | `true` | Silent in-game alerts |
| `alerts.min-interval` | `10s` | Minimum time between two alerts about one player (a higher level always alerts) |
| `teleport.vanish-first` | `true` | Vanish before teleporting |
| `teleport.allow-offline` | `false` | Teleport to an offline player's last position |
| `freeze.allowed-commands` | `[msg, r, tell, helpop]` | Commands a frozen player may still use (first word, no slash) |
| `freeze.invulnerable` | `true` | Frozen players take no damage |
| `freeze.remind-every` | `3s` | How often the "frozen" title is shown again |
| `freeze.quit-commands` | `[]` | Console commands when a frozen player logs out. `{player} {uuid} {staff}` |
| `freeze.quit-alert` | `true` | Tell staff when a frozen player logs out |
| `spectate.first-person` | `false` | Look through the target's eyes instead of floating next to them |
| `vanish.toggle-command` | `vanish` | SimpleVanish's toggle command |
| `vanish.placeholder` | `%simplevanish_vanished%` | Placeholder that tells whether someone is vanished |
| `vanish.fallback-hide` | `true` | If the vanish plugin didn't vanish you, hide you from everyone without `dsusmenu.see-vanished` |
| `punishments.run-as-staff` | `true` | In game, run AdvancedBan commands as the staff member |
| `punishments.console-reason` | `{reason} (by {staff})` | Reason format when the console runs them (Discord) |
| `punishments.commands.*` | AdvancedBan's | `kick`, `ban`, `tempban`, `mute`, `tempmute`. Placeholders: `{player} {uuid} {reason} {duration} {staff}`. Empty = action disabled (kick: done natively) |
| `punishments.confirm` | ban, tempban, mute, tempmute, kick, dismiss | Actions that ask "Are you sure?" (also possible: `resolve`) |
| `punishments.confirm-enabled` | `true` | Switch all confirmations off |
| `discord.enabled` | `true` | Send anything to Discord |
| `discord.events.*` | all `true` | `case-level`, `client-detection`, `punishment`, `staff-action`, `case-status`, `case-export`, `system-error` |
| `evidence.enabled` / `before` / `after` | `true` / `10s` / `5s` | The movement timeline around a flag that opens or raises a case |
| `client-scan.enabled` | `true` | [Client detection](/plugins/dsusmenu/features/client-detection/) on join |
| `client-scan.delay-ticks` | `40` | How long after the join to evaluate (channels keep registering) |
| `privacy.ip-logging` | `false` | Store a salted hash of the IP (never the address) |
| `privacy.ip-salt` | `change-me` | Set your own random value if you turn IP logging on; the console warns otherwise |
| `debug.fake-flags` | `false` | Allows `/sus debug` test flags. Keep off in production |
| `debug.log-flags` | `false` | Print every incoming flag to the console |

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
