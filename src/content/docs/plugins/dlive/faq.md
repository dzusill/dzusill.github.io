---
title: "FAQ & Troubleshooting"
description: "dlive.use defaults to false. Grant it to the ranks allowed to announce:"
---

## `/live` says I have no permission

`dlive.use` defaults to `false`. Grant it to the ranks allowed to announce:

```
lp group media permission set dlive.use true
```

## The plugin will not load at all

Check Java first:

```
java -version
```

dLive needs **Java 25**. Many hosts still default to 17 or 21, and an older runtime refuses the jar
outright. Also confirm `DzusillCore.jar` is in `plugins/` — it is a hard dependency and dLive will not
enable without it.

## My link is refused as an invalid platform

The hostname is not on the allowlist. Either it is genuinely not a configured platform, or it is a
subdomain and only the bare domain is listed. Both are usually needed:

```yaml
domains:
  - twitch.tv
  - "*.twitch.tv"
```

Shorteners are refused by design — they hide the destination, which is what the allowlist exists to
check.

## The skin face is on but I get plain text

Almost always `online-mode: false`. An offline profile has no skin texture to fetch, so the face falls
back to `broadcast.chat.lines` without saying so. See [Skin Face](/plugins/dlive/features/skin-face/).

If you are on online mode, the other cause is timing: the skin is fetched when the player joins, so
announcing in the first second gets the plain body.

## Editing config.yml did nothing

Run `/dlive reload`. If it reports a problem, the old configuration is still running — fix the file
and reload again. `database.yml` is the exception and needs a restart.

## Nobody sees announcements except me

They have opted out with `/live toggle`, or `broadcast.chat.enabled` is `false`. Check one player with
`/dlive stats <name>`.

## The same player announced twice in a row and the second was refused

That is the [duplicate window](/plugins/dlive/features/cooldowns-and-duplicates/), not the cooldown — it applies to
the *link*, so re-announcing the same URL is blocked even after the cooldown expires. Set
`url-security.duplicate-window-seconds: 0` to switch it off.

## `/live twitch` says I have nothing saved, but I do

If you had just joined, the read had not landed yet — that case reports *not ready* instead. If it
genuinely says nothing is saved, check with `/live platform list`; saved links are per player, so
somebody else's link is not yours.

## Discord gets nothing

`enabled: true` and a URL in `discord-webhook.url`, then reload. Failures are logged rather than
silent, so check the console — a webhook that Discord has deleted returns an error there.

## Can two servers share this?

Yes, point both at the same MySQL database. They share history, blocks, saved links and opt-out state,
and the duplicate window covers both. Announcements are not relayed between servers — use the Discord
webhook for one shared feed.

## Can I add my own streaming site?

Yes. Add a key under `platforms` with its own display name, domains and colour. It then works
everywhere, including as a target for saved links. See
[Link Security](/plugins/dlive/features/link-security/).
