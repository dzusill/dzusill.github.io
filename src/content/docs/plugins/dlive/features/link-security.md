---
title: "Link Security"
description: "/live broadcasts to your entire server. Without a guard, that is a free advertising slot for"
---

`/live` broadcasts to your entire server. Without a guard, that is a free advertising slot for
whoever thinks of it first. dLive's answer is an allowlist: a link is announced only if its hostname
matches a platform you configured.

## The allowlist

```yaml
platforms:
  twitch:
    display-name: "Twitch"
    domains:
      - twitch.tv
      - "*.twitch.tv"
    webhook-color: "#9146FF"
```

Four platforms ship enabled: YouTube (including `youtu.be`), Twitch, TikTok (including `vm.tiktok.com`)
and Kick. Anything else is refused with the *invalid platform* message.

A `*.` prefix accepts subdomains. `twitch.tv` and `*.twitch.tv` are both needed to accept the bare
domain and `www.twitch.tv`.

### Custom platforms

Add a key and it works everywhere immediately — in matching, in `%platform%`, in history, in the
webhook embed colour, and as a target for [saved links](/plugins/dlive/features/saved-links/):

```yaml
platforms:
  ownsite:
    display-name: "Our Stream"
    domains:
      - stream.example.com
    webhook-color: "#00C2A8"
```

### Suffix spoofing is handled

`twitch.tv.evil.example` does not match `twitch.tv`. Matching is on domain boundaries, not string
suffixes.

## What is rejected before matching

Regardless of platform, a link is thrown out if it:

- uses any scheme other than HTTPS after normalisation (`ftp://`, `javascript:` and friends)
- carries user info (`https://user@twitch.tv/name`)
- carries a fragment (`https://twitch.tv/name#section`)
- names an explicit port other than 443
- contains whitespace, control characters, quotes, angle brackets or backslashes

Bare and HTTP input is upgraded rather than rejected: `twitch.tv/name` and `http://twitch.tv/name`
both become `https://twitch.tv/name`.

Third party URL shorteners are not on the allowlist and therefore cannot be announced. That is the
point — a shortener hides the destination, which is exactly what the allowlist exists to check.

## The blocklist

Two layers, both checked on every announcement.

**Static**, in `config.yml`, applied on reload:

```yaml
blocked-domains: []
blocked-urls: []
```

A blocked domain also blocks its subdomains.

**Runtime**, in the database, managed in game and effective immediately:

```
/dlive block domain example.com
/dlive block url https://twitch.tv/specificchannel
/dlive unblock domain example.com
/dlive blocked
```

`/dlive blocked` lists both layers together and labels which is which, so you can see at a glance
whether an entry came from the file or the database. Config entries cannot be removed with
`/dlive unblock` — edit the file and reload.

## Normalisation and duplicates

Every link is reduced to a canonical form before the duplicate check: lowercase host, no trailing
slash, no default port. `https://WWW.TWITCH.TV/Name/` and `https://www.twitch.tv/Name` are the same
link as far as [duplicate protection](/plugins/dlive/features/cooldowns-and-duplicates/) is concerned.
