---
title: "Quick Start"
description: "Five minutes, assuming the jar is in and the server is up."
---

Five minutes, assuming the jar is in and the server is up.

## 1. Let somebody announce

```
lp group media permission set dlive.use true
```

Nothing works until a rank holds `dlive.use`. See [Installation](/plugins/dlive/getting-started/installation/) for why.

## 2. Announce something

As a player in that rank:

```
/live https://twitch.tv/yourname
```

The announcement goes to everyone who has not opted out, plus the console. The link line is clickable
and carries a hover tooltip.

## 3. Save it so you never type it again

```
/live platform add twitch https://twitch.tv/yourname
/live twitch
```

The second command does exactly what step 2 did. One word instead of a URL. See
[Saved Links](/plugins/dlive/features/saved-links/).

## 4. Make it look like your server

`broadcast.chat.lines` in `config.yml` is the announcement body, in MiniMessage:

```yaml
broadcast:
  chat:
    lines:
      - "                    "
      - "  <b><gradient:#FD3DB5:#DA70D6>%player%</gradient></b> <#AAAAAA>is live on <white>%platform%"
      - "  <#AAAAAA><underlined>%link%"
      - "                    "
```

Then `/dlive reload`. No restart.

A line of spaces rather than `""` is deliberate: some clients collapse a genuinely empty chat line
and a padded one survives.

## 5. Decide who may announce how often

```yaml
cooldowns:
  default-seconds: 30
  tiers:
    media:
      permission: dlive.cooldown.media
      seconds: 15
```

Tiers are ordinary permission nodes. A player matching more than one gets the shortest time.

## Optional next steps

- [Discord Webhook](/plugins/dlive/features/discord-webhook/) — mirror announcements to your community
- [Link Security](/plugins/dlive/features/link-security/) — what is blocked out of the box, and how to add to it
- [Skin Face](/plugins/dlive/features/skin-face/) — draw the streamer's head into the announcement
