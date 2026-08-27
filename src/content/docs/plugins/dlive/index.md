---
title: "dLive"
description: "dLive gives your streamers one command to announce they are live, and gives you full control over"
---

**dLive** gives your streamers one command to announce they are live, and gives you full control over
what that command is allowed to send. Links are normalised to HTTPS and matched against a domain
allowlist before anything reaches chat, so `/live` can never be turned into an advert for somebody
else's server.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) and runs on Paper and Folia.

---

## What it does

- 📡 **One command** — `/live <link>` posts a clean, clickable announcement to everyone who has not opted out.
- 🔖 **Saved links** — a streamer saves their channel once per platform and goes live with `/live twitch`. No URL to paste, no typo to fix.
- 🛡️ **A domain allowlist** — YouTube, Twitch, Kick and TikTok are recognised out of the box, and nothing else gets through unless you add it.
- 🔒 **Link security on by default** — bare and HTTP input is upgraded to HTTPS; explicit ports, user info, fragments, control characters and third party shorteners are all rejected before delivery.
- 🚫 **A blocklist** — block a domain or an exact URL from `config.yml` or live in game with `/dlive block`.
- ⏱️ **Cooldowns through permissions** — tiers are ordinary permission nodes, so LuckPerms manages them and a player matching more than one tier gets the shortest time.
- 🔁 **Duplicate protection** — the same link cannot be announced twice inside a window you choose.
- 💬 **Discord webhook** — the same announcement goes out as a rich embed with a title, thumbnail, colour and fields.
- 📜 **History** — every broadcast is stored with who, when and where, browsable in game and purged automatically on a retention schedule.
- 🔕 **Player opt out** — players who do not want stream pings switch them off themselves, and it sticks across restarts.
- 🧑 **Skin face** — optional and off by default: draws the streamer's own head into the announcement, one coloured character per skin pixel.
- 🧩 **PlaceholderAPI** — five placeholders for TAB, scoreboards and chat formats.
- 🗄️ **H2 or MySQL** — a local file out of the box, or point it at MySQL for a network.

---

## Where to start

New here? [Requirements](/plugins/dlive/getting-started/requirements/) then
[Quick Start](/plugins/dlive/getting-started/quick-start/) will have it announcing in a few minutes.

Already running it? [Saved Links](/plugins/dlive/features/saved-links/) is the feature most people miss, and
[Link Security](/plugins/dlive/features/link-security/) explains what is being blocked and why.
