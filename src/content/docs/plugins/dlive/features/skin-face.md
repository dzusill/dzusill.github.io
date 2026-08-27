---
title: "Skin Face"
description: "Optional, off by default. Turned on, the announcement is drawn with the streamer's own head — the"
---

Optional, **off by default**. Turned on, the announcement is drawn with the streamer's own head — the
8×8 face read out of their skin, one coloured character per pixel — with the announcement text written
beside it.

```
████████
████████
████████  DZUSILL
████████  is live on Twitch
████████  ⏵ https://twitch.tv/dzusill
████████
```

## Turning it on

```yaml
broadcast:
  chat:
    face:
      enabled: true
      pixel: "█"
      lines:
        - ""
        - ""
        - "  <b><gradient:#FD3DB5:#DA70D6>%player%</gradient></b>"
        - "  <#AAAAAA>is live on <white>%platform%"
        - "  <#AAAAAA><underlined>%link%"
```

While it is on, `face.lines` **replaces** `broadcast.chat.lines`. It is written to the right of each
face row, top row first, so leading empty strings push the text down and are what give the block its
shape. Eight rows are available; a shorter list simply stops, and a longer one continues underneath
the face.

`pixel` is the character each skin pixel becomes. `█` reads as a solid face; `▓` or `■` give a lighter
look.

Every placeholder from [Announcing](/plugins/dlive/features/announcing/) works in `face.lines`.

## It needs online mode

The face is read from the player's skin texture, which comes from their Mojang profile. On a server
running `online-mode: false` there is no texture to fetch, so **the face silently falls back to the
plain `lines:` body**. Nothing is logged and the announcement still goes out — it just has no picture.

If you enabled the face and see the plain body, this is almost always why.

## How it behaves

- **The skin is fetched once, when the player joins**, and cached. An announcement never waits on the
  network.
- **A player who goes live in their first second gets the plain body.** The fetch has not landed yet;
  this is the intended trade rather than delaying the announcement.
- **A skin change redraws itself.** The cache is compared by texture, not just by player.
- **No custom skin, or a texture server having a bad minute, falls back to `lines:`.** Nothing in the
  face is allowed to fail an announcement.
- **The hat layer is composited over the head**, so skins whose face lives entirely in the second
  layer render correctly.

## Old skins

The original 64×32 skin format had no alpha to spare, so a player who used no hat shipped one filled
with solid opaque black — Notch's own skin is exactly this. Composited literally, that paints a black
square where the face should be.

dLive treats a hat that is one single opaque colour across all 64 pixels as a placeholder fill and
drops it. A hat with any variation in it is a real hat and is drawn.

## Turning it off

Set `enabled: false` and reload. The announcement goes back to `broadcast.chat.lines`, which is left
untouched the whole time the face is on.
