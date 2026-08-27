---
title: "Saved Links"
description: "A streamer saves their channel once per platform, then announces with a single word."
---

A streamer saves their channel once per platform, then announces with a single word.

```
/live platform add twitch https://twitch.tv/dzusill
/live twitch
```

The second command does exactly what pasting the URL would have done. Same cooldown, same duplicate
window, same blocklist, same history entry — a saved link is a shortcut, not a privilege.

## The commands

| Command | Does |
|---|---|
| `/live platform add <platform> <link>` | saves a link. Refuses if that platform already holds one |
| `/live platform edit <platform> <link>` | replaces a saved link. Refuses if there is nothing to replace |
| `/live platform remove <platform>` | deletes a saved link |
| `/live platform list` | shows what you have saved, each row clickable to announce it |
| `/live <platform>` | announces the saved link |

All of them need `dlive.use`, the same node as `/live` itself.

`add` and `edit` are deliberately not interchangeable. `add` refusing to overwrite means a streamer
cannot silently replace a working link by mistyping a command, and `edit` refusing to create means a
typo in the platform name is an error rather than a new entry nobody will ever use.

## One link per platform

The platform name is a key from the `platforms` section of `config.yml` — `twitch`, `youtube`,
`kick`, `tiktok`, or any custom platform you added. It is not a free-form nickname, so each player
holds at most one link per platform.

The link's domain has to resolve to the platform it is being filed under. Saving a `twitch.tv` URL as
`youtube` is refused, and the error names the platform the link actually belongs to. Without that
check, `/live youtube` would announce a Twitch stream labelled YouTube.

## Tab completion

`/live <tab>` suggests `toggle`, `platform`, and the caller's own saved platform ids. A player who has
saved nothing sees only the first two.

## Storage

Saved links live in the `dlive_saved_links` table, keyed by player and platform, so they survive
restarts and follow the account across a network when you use MySQL.

They are loaded once when the player joins and held in memory from then on, so announcing never waits
on a database round trip. A player who joins and immediately runs `/live twitch` in the first moments
gets a *not ready* message rather than a wrong *nothing saved* one.

## Raw links still work

`/live https://twitch.tv/anything` is unchanged. The saved-link path only triggers when the argument
exactly matches a configured platform id, and a bare word like `twitch` could never have validated as
a URL anyway.
