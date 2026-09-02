---
title: "Announcements"
description: "A restock nobody notices is a restock that sits unsold until the next one clears it. The announcement is not"
---

A restock nobody notices is a restock that sits unsold until the next one clears it. The announcement is not
decoration — it is the difference between an auction house that feels alive and one that quietly cycles stock to
itself.

```yaml
announce:
  chat: true
  sound:
    name: "ENTITY_PLAYER_LEVELUP"
    volume: 0.6
    pitch: 1.4
  title:
    enabled: false
    fade-in-ticks: 10
    stay-ticks: 50
    fade-out-ticks: 10
  discord:
    enabled: false
    webhook-url: ""
    username: "Auction House"
    content: "**Daily restock — {count} new listings**\n{items}"
    color: 16766720
```

## Chat

The broadcast text lives in [messages.yml](/plugins/dauctionfeed/configuration/messages/):

```yaml
restock-broadcast: "<prefix><yellow>The auction house has been restocked! <gray>{count} new listings are up for grabs. {sale}"
```

| Placeholder | Value |
|---|---|
| `{count}` | How many listings were created |
| `{total}` | Their combined value |
| `{sale}` | The sale tag while a [sale](/plugins/dauctionfeed/features/pricing/#4-sales) is running, otherwise empty |

## Sound

```yaml
sound:
  name: "ENTITY_PLAYER_LEVELUP"
```

Both spellings work — the enum style `ENTITY_PLAYER_LEVELUP` and the vanilla key `entity.player.levelup`. Leave
the name blank for silence.

An unknown name is reported once:

```
[dAuctionFeed] Unknown sound 'ENTITY_PLAYER_LEVELUPP' in announce.sound.name — no sound will play.
```

## Title

Off by default — a full-screen title at 4am for the three people online is a lot. Worth enabling if you restock at
a busy hour.

Text comes from `restock-title` and `restock-subtitle` in messages.yml.

## Discord

Paste a **channel webhook URL** and flip `enabled`:

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/…"
```

| Placeholder | Value |
|---|---|
| `{count}` | Number of listings |
| `{total}` | Combined value |
| `{items}` | A bullet list of everything listed, with amounts and prices |
| `{sale}` | The sale tag, or empty |

Produces something like:

```
Daily restock — 11 new listings
• 48x Iron Ingot — 1,920
• 16x Diamond — 4,300
• 1x Diamond Pickaxe — 27,500
```

`color` is the embed strip colour as a decimal integer (`16766720` is gold).

Posting is fire-and-forget on a background thread: Discord being slow, rate-limiting or down can never hold up a
restock. A rejected post is logged and nothing else happens.

{% hint style="info" %}
MiniMessage tags are stripped from item names before they reach Discord, so `<aqua>Diamond` posts as `Diamond`.
{% endhint %}
