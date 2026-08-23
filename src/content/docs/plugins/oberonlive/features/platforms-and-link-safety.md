---
title: "Platforms & Link Safety"
description: "Define streaming platforms and understand HTTPS normalization, exact hostname, port, character, blocklist and duplicate checks applied to every URL."
---

Every platform is data in `config.yml`:

```yaml
platforms:
  kick:
    display-name: "Kick"
    domains:
      - kick.com
      - "*.kick.com"
    webhook-color: "#53FC18"
```

The section key becomes `%platform_id%`, `display-name` becomes `%platform%`, and `webhook-color` is used when the Discord embed does not set one global color.

## Exact and wildcard rules

| Rule | Accepts | Rejects |
|---|---|---|
| `twitch.tv` | `twitch.tv` | `www.twitch.tv` |
| `*.twitch.tv` | `twitch.tv`, `www.twitch.tv`, `clips.twitch.tv` | `twitch.tv.attacker.example`, `nottwitch.tv` |

A wildcard deliberately includes the root. Platform roots may not overlap across two different platform definitions; an ambiguous config is refused.

## Shipped platforms

- YouTube: `youtube.com`, its subdomains, and `youtu.be`
- Twitch: `twitch.tv` and its subdomains
- TikTok: `tiktok.com`, its subdomains, and `vm.tiktok.com`
- Kick: `kick.com` and its subdomains

OberonLive does not resolve a third-party short URL to discover where it goes. Add only a domain you own or explicitly trust. Redirects are never followed during validation.

## URL rules

A player may enter any of these forms:

```text
twitch.tv/name
http://twitch.tv/name
https://twitch.tv/name
```

All three become `https://twitch.tv/name` before storage, broadcast, history, block comparison and Discord delivery. After that normalization, the URL must:

- use HTTPS; every other explicit scheme is rejected,
- fit within `url-security.max-length`,
- contain a hostname owned by exactly one configured platform,
- use the default port or explicit port 443,
- contain no user-info, fragment, whitespace, control characters, quotes, angle brackets or backslash.

The normalized duplicate key lower-cases the host, removes the default `:443`, normalizes dot segments and removes a trailing slash except for `/`. Query parameters are retained because they can identify a specific live event.

## Duplicate protection

`url-security.duplicate-window-seconds` is global, not per player. Two players cannot publish the same normalized URL within the window. An in-memory reservation closes the race while the SQL duplicate lookup and insert are running.

`oberonlive.cooldown.bypass` skips this check. Set the window to `0` to disable it for everyone.

## Blocklists

`blocked-domains` blocks the named root and every subdomain. `blocked-urls` blocks one normalized URL. Runtime blocks in the database apply the same way and can be managed without editing the file. See [History & Moderation](/plugins/oberonlive/features/history-and-moderation/).
