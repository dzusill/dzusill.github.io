---
title: "FAQ & Troubleshooting"
description: "In order:"
---

### Nothing is being announced at all

In order:

1. **How many players are online?** The shipped `min-players` is `2`. With one player online, nothing fires — that is the setting working. Set `min-players: 1` to test alone.
2. `/announcements list` — is there a row, and does it say `enabled`?
3. `/announcements next` — is there a future time? `not scheduled` means nothing is due.
4. `/announcements preview discord` — this bypasses every rule. If it renders, the cause is an audience rule, a mute or a permission node.
5. `/announcements send discord` — the reply reports how many players it reached. `0` with players online narrows it further.

The first fire is also `initial-delay-seconds` after start-up, which defaults to the full interval — fifteen minutes on the shipped file.

### `/announcements list` shows one row for eleven announcements

That is correct. `chat-announcements` is **one** announcement whose entries are its variants; the entries are listed indented underneath it. The channel is what has a schedule, so it is what a schedule row describes.

See [Channels](/plugins/oberonannounce/features/channels/).

### I added an entry and it did not appear

Three causes, in order of likelihood:

1. **The reload was refused.** Read the reply — a refused reload keeps the old configuration and says exactly what was wrong.
2. **The id collides with a channel setting.** `mode`, `permission`, `style`, `progress` and a dozen others are read as settings, not entries, and are skipped without an error. Rename it.
3. **It is not a section.** `vote: "text"` is refused with `chat-announcements.vote must be a section`; an entry needs `lines:` or `line:` under it.

`/announcements list` shows what actually loaded.

### The plugin refuses to enable

```
[OberonAnnounce] Invalid config.yml: chat-announcements.store: click.text needs a click.command to run
```

By design. Starting with half a set of announcements would be worse than not starting. Every problem found in the pass is listed in one message, separated by `; ` — fix them all and start again.

### The sound does not play

`sound.type` is a registry key, and a name the registry does not know is passed to the client unchanged and plays nothing, with no error. Check the spelling character by character, or switch to the key form:

```yaml
sound:
  enabled: true
  type: block.note_block.chime
```

Also check `sound.enabled` is `true` — it defaults to `false` — and that you have not run `/announcements toggle sound` on the account you are testing with.

See [Sound](/plugins/oberonannounce/features/sound/).

### `schedule.at` is refused even though the date looks right

Quote it.

```yaml
      at: "2030-01-01T09:00:00"
```

Unquoted, YAML reads it as a timestamp in UTC — a different instant than your `timezone` implies — so the plugin refuses it rather than guessing. See [Known Limitations](/plugins/oberonannounce/limitations/#an-unquoted-at-timestamp-is-rejected).

### My announcement drifts a little later every cycle

It should not. The next fire is anchored on the instant an announcement was **due**, not on the tick that noticed it, so the rounding error never accumulates. A ten-minute announcement anchored on the tick drifted by roughly two and a half minutes a day; this build does not.

If you are seeing real drift, check that you are not reloading repeatedly with a changed schedule — a changed schedule restarts the initial delay.

### I keep reloading and the announcement never fires

That was the old behaviour and it is fixed: a reload carries the existing next-fire instant forward for any announcement whose schedule, enabled state and time zone are unchanged. Editing the schedule, or changing `timezone`, does restart the countdown — legitimately.

### The boss bar section does nothing

Boss bar output is not implemented in this build. `bossbar-announcements` is parsed and ignored so an existing config still loads. See [Known Limitations](/plugins/oberonannounce/limitations/#boss-bar-output-is-not-implemented).

### I added a command alias and it is not recognised

Aliases are claimed when the plugin enables, because Bukkit builds its command map once. Restart the server — a reload cannot do it. See [Known Limitations](/plugins/oberonannounce/limitations/#command-aliases-need-a-restart).

### `title:` shows up in chat instead of on screen

Inside a channel entry, `title:` is the **first chat line**, not a Minecraft title. On-screen titles exist only on a variant in the `announcements:` section, as a `title:` block with `header` and `subtitle`.

See [Writing an Announcement](/plugins/oberonannounce/features/announcements/#titles-and-action-bars).

### A `ONCE` announcement fired and I want it to fire again

Its id is recorded in `plugins/OberonAnnounce/state.yml` under `completed-one-time`. Stop the server, remove the id, start again.

Renaming the announcement has the same effect, since state is keyed by id — but it also resets the rotation cursor and orphans its permission node, so prefer editing `state.yml`.

### The server was down over a `ONCE` announcement's time

`scheduler.missed-one-time` decides:

- `SKIP` (the default) sends nothing and marks it complete at start-up, so it cannot surprise anybody later;
- `SEND_ON_STARTUP` sends it on the next tick after start-up.

`DAILY` and `WEEKLY` simply calculate their next occurrence from the moment the server came back, and occurrences missed while it was down collapse into a single delivery rather than being replayed one after another.

### One player says they receive nothing

1. Have they run `/announcements`? It persists across restarts. Ask them to run it again — the reply says which state they are now in.
2. Is `oberonannounce.receive.<id>` **denied** for them or a group they are in? Unset is fine; explicitly `false` is not.
3. Do they meet the audience rules — world, game mode, `permission`?

`oberonannounce.bypass-toggle` keeps an account receiving announcements even while muted, which is what a staff account normally wants.

### `%vault_eco_balance%` shows up as raw text

PlaceholderAPI is not installed, or was installed after OberonAnnounce started. The hook is registered at enable; restart to pick it up. Without PAPI the plugin's own `%player%`, `%online%`, `%max_players%`, `%announcement%` and `%variant%` still work and everything else is left as literal text.

See [Placeholders](/plugins/oberonannounce/placeholders/).

### Does the click line let players run commands they should not?

No. The command runs **as the clicking player**, with their permissions, exactly as if they had typed it. Point one at `/discord`, `/store` or `/vote`; do not point one at a staff command and assume the click grants anything.

The command is also attached to the finished component after your MiniMessage is parsed, so a stray `<click:run_command:…>` tag written into the body — or arriving from a placeholder — cannot change which command a player ends up running.

### Can one entry go to a different world than the rest?

Not inside a channel. The whole channel shares one schedule, one world filter and one set of audience rules. An announcement that needs its own belongs in the `announcements:` section, where each announcement carries an `audience` block of its own.

See [Audience & World Filtering](/plugins/oberonannounce/features/audience/).

### Does a daylight-saving change move my daily announcement?

No. `DAILY` and `WEEKLY` occurrences are calculated as a local date plus a local time in your configured IANA zone, so `20:00` stays 20:00 all year. `INTERVAL` is elapsed time and never touches the calendar at all.

Use a zone id (`Europe/Bratislava`), not an abbreviation (`CET`) — an abbreviation refuses the config.

### `random` repeated the same announcement twice

It cannot repeat the **immediately** preceding one — the last pick is remembered, in `state.yml`, across restarts. It can pick the same entry twice within three fires, because that is what random means. Use `rotate` if you want a strict cycle.

### Why did the rotation start over?

`state.yml` is keyed by announcement id. Renaming a channel or an announcement resets its cursor. A clean restart does not — the cursor is written back, debounced, off the main thread, and flushed synchronously on shutdown.

### Does it store player data?

Only UUIDs, and only for the two toggles: `muted-players` and `muted-sounds` in `state.yml`. Nothing else about a player is written anywhere, and the plugin uses no database.

### Does it work on Folia?

No. `plugin.yml` declares `folia-supported: false`. Delivery already schedules per player, but the announcement engine owns a single global repeating task.

### Can I use `/reload`?

No. Commands and aliases are claimed at enable and the engine owns a repeating task. Use `/announcements reload` for configuration changes and restart the server for anything else.
