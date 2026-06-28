---
title: "Gradient & Color Nicks"
description: "A nick in dNicks is a MiniMessage string. The visible text plus any styling you're allowed to use."
---

A nick in dNicks is a [MiniMessage](https://docs.papermc.io/adventure/minimessage/) string. The visible text plus any styling you're allowed to use.

## What you can use

| Style | Example | Permission |
|---|---|---|
| Named colors | `<red>Name</red>`, `<aqua>Name</aqua>` | `dnicks.color.<name>` (or `dnicks.color.*`) |
| Hex colors | `<#ff5fa2>Name</#ff5fa2>` | `dnicks.color.hex` |
| Gradient | `<gradient:#ff5fa2:#a18fff>Name</gradient>` | `dnicks.gradient` |
| Rainbow | `<rainbow>Name</rainbow>` | `dnicks.gradient` |
| Decorations | `<bold>`, `<italic>`, `<underlined>`, `<strikethrough>` | `dnicks.format` |

Ops have everything. A plain nick (`/nick Steve`) needs only `dnicks.nick.self`, which is on by default.

## True hex, everywhere

Gradients are rendered as real per-character hex colors and sent to the client natively, so they stay smooth — they are **not** downsampled to the 16 legacy colors. The same single rendered name is used for chat, the tab list and the floating nametag, so it always looks identical.

## Rules

Set in `config.yml` under `nick:`:

- **Length** — `min-length` / `max-length` apply to the *visible* text (tags stripped), not the raw string.
- **Allowed characters** — `allowed-pattern` (a regex) is checked against the visible text. Default `^[A-Za-z0-9_]+$`.
- **Uniqueness** — set `unique: true` to stop two players holding the same plain nick.
- **Allowed / forbidden tags** — `allowed-tags` is the whitelist; `forbidden-tags` is always rejected.

## Safety

Nicks come from players, so dNicks parses them with a **restricted** MiniMessage that only understands color, decoration, gradient and rainbow tags. Interactive/abusable tags — `click`, `hover`, `insertion`, `font`, `selector`, `transition`, `obfuscated` — are rejected with a clear error and can never be produced, even by an operator. A player can't make their name run a command or show a fake tooltip.

See [config.yml](/plugins/dnicks/configuration/config/) for every related setting, and [Commands & Permissions](/plugins/dnicks/commands-and-permissions/) for the full permission list.
