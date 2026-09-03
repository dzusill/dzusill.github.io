---
title: "The Donor's Head in Chat"
description: "{playerhead} in announcements.yml draws the donor's real skin next to their name — not a resource pack, not an image trick, read straight from the actual…"
---

`{player_head}` in `announcements.yml` draws the donor's real skin next to their name — not a resource pack, not an image trick, read straight from the actual texture Mojang (or the player's own client) provides.

## Two styles

Set with `player-head-style` in `announcements.yml`:

- **`pixels`** (the default) — the skin's 8×8 face, redrawn as a block of coloured square characters, eight chat lines tall, with the rest of the announcement's text set beside it:

  ```
  ████████
  ████████
  ████████ Notch purchased:
  ████████ Nebula Rank
  ████████ store.example.com
  ████████
  ████████
  ████████
  ```

  `player-head-pixel` chooses the character (`█` by default — try `██` for a squarer look, since most monospace glyphs render taller than they are wide). `player-head-text-row` picks which face row the first line of text lines up with (`3` by default, roughly the middle of the face). `player-head-gap` is what sits between the face and the text — plain MiniMessage, so it can carry its own colour, e.g. `'<gray>│ '`.

- **`icon`** — Minecraft's own native inline head component, one character tall, sitting directly in the text wherever `{player_head}` appears in a line — like an emoji, not a block of art.

Turning `player-head-hover: false` off entirely makes `{player_head}` behave exactly like `{player}` — no lookup, no download, just the name.

## How the skin is found

In order, cheapest first:

1. **Online right now?** A connected player already carries their own skin — sent by their client during login, completely independent of whether *this server* runs `online-mode`. No network call at all.
2. **Not online — Mojang lookup.** A real Mojang UUID (which is what a Tebex purchase always carries, resolved by Tebex itself at checkout regardless of this server's mode) is looked up against Mojang's session server, off the main thread. This is a genuine network round trip, cached after the first time a given skin is seen.
3. **Neither works** — anonymous donor, unresolvable UUID, Mojang unreachable — falls back to the plain name. Never an error, never a broken announcement.

An **anonymous** donor's real UUID is never even looked up — the plain name is used from the very start, so their skin can never leak through just because their name is hidden.

### `pixels` style and legacy skins

The face sits at the same fixed pixel coordinates on every skin, old or new, and a "hat" overlay (glasses, hair, masks) is composited on top when present. Some very old 64×32 skins fill that overlay area with **fully opaque black** rather than leaving it transparent — Notch's own skin is exactly this — and that would otherwise paint the whole face solid black. This is detected and skipped automatically: an overlay with no transparency anywhere in it, on a sheet shorter than 64 pixels, is treated as absent, the same rule Minecraft itself applies.

## Testing it yourself

```
/donations trigger <player|uuid> [amount] [product]
```

- A player who is **online right now** always shows a real head, by name.
- Someone not currently online needs a **real UUID**, not a name — on a server running `online-mode: false` (common behind a proxy that does its own authentication), Bukkit synthesises a fake UUID for any name it has never seen, without ever contacting Mojang, and there is genuinely no skin behind that UUID to find. The command tells you when this has happened. A player who has actually joined through the proxy is cached with their real UUID and works fine by name even while offline.

## Troubleshooting

1. Confirm `player-head-hover: true` in `announcements.yml`.
2. Confirm which style you expect — `pixels` (the full face) or `icon` (one character). Seeing a tiny head when you expected the full face usually just means the style is set to `icon`.
3. Test with an account that is online right now, or pass a real UUID to `/donations trigger` — see above.
4. Set `debug-chat-json: true`, `/donations reload`, trigger again, and read the `[chat-json]` console lines it produces. A working `pixels` line shows eight rows of `█` in several distinct colours; a working `icon` line's JSON contains `"player":{…,"properties":[{"name":"textures",…}]}`. If instead you see a plain-name line and nothing else, a `WARNING` line logged just above it names the exact reason the lookup failed.

## Why it cannot be a simple text placeholder

Worth knowing if you ever wonder why this placeholder behaves differently from every other one: a real head — one carrying an actual skin's texture data — has no representation as plain MiniMessage text at all. Internally, the resolved head is inserted directly into the parsed chat line as a real component, rather than being converted to a string and substituted like every other placeholder; this is also why `{player_head}` only ever works inside `chat` — the other channels (action bar, boss bar, titles) have no way to embed a component like this in vanilla Minecraft, and always show the plain name there instead.

## See also

- [Announcements](/plugins/oberondonations/features/announcements/)
- [announcements.yml reference](/plugins/oberondonations/configuration/announcements-yml/)
- [Known Limitations](/plugins/oberondonations/limitations/)
