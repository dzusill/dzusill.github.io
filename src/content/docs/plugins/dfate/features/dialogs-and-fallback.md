---
title: "Dialogs & Fallback"
description: "dFate needs no rendering plugin. It ships its own native dialog backend, so the choice screen draws itself on any server new enough to have the API."
---

**dFate needs no rendering plugin.** It ships its own native dialog backend, so the choice screen draws itself on any server new enough to have the API.

It builds a `DialogSpec` — a plain description of a screen — and hands it to DzusillCore's `DialogService`, which decides how to render it.

```
dFate                    DzusillCore                    dFate's own backend
  DialogSpec  ──────────► DialogService ──── spec ────►  native dialog
  (title, body,           │                              (server + client 1.21.6+)
   three buttons)         │
                          └─ too old, or no backend
                             └─ chat fallback: a numbered prompt
```

The call site is the same either way. There is no version gate to configure and no branch in the plugin: whether a native dialog is possible is decided per call, per player.

## What each player gets

| Situation | Result |
|---|---|
| Server 1.21.6+, client 1.21.6+ | The native dialog screen, rendered by dFate. |
| Client older (including behind a translating proxy) | Chat fallback. Detected through ViaVersion when present. |
| Server older than 1.21.6 | Chat fallback, for everyone. |

## If dDialogs is installed anyway

It wins, and that is deliberate. [dDialogs](https://github.com/dzusill/DDialogs) registers its renderer at service priority `Normal`; dFate registers at `Low` and steps aside.

dDialogs is the dedicated implementation — extra MiniMessage tags, its own dialog registry, YAML-defined menus — and a server running it wants those everywhere, not just outside dFate. Registering any higher would have dFate quietly take over every dialog on the server, including other plugins', which is a much larger change than "dFate stopped needing a dependency".

Neither is required. The startup log says which one answered:

```
[dFate] Native dialog rendering enabled: dfate-paper-typed (1.21.11, client-gate=viaversion)
```

## Why the renderer cannot live in DzusillCore

Every typed dialog builder in the Paper API takes a native `net.kyori` component. DzusillCore relocates `net.kyori` into `me.dzusill.core.lib.kyori`, so any call core made to one would be rewritten by the shade relocator and fail at runtime — not a style problem, a hard one.

That is why rendering is an SPI: core defines `DialogBackend`, and an unshaded plugin implements it. dFate is unshaded, so it can call the API directly and parse MiniMessage with the **server's own** instance, which always emits the component format the running server expects.

Everything crossing that boundary is a plain core type — records of `String`, primitives and `java.util` collections. No component, no NBT.

The chat fallback prints the title and body as chat lines and offers two clickable options. It is a worse screen but a working one, and the same handler runs at the end of it — so the mode is stored identically.

## The shape of the choice screen

This is the one design decision worth knowing about, because it constrains anything you might add to that screen.

DzusillCore's chat fallback renders `notice` and `confirmation` and **declines** everything else, on the sound reasoning that a slider or a text field has no faithful chat equivalent. A declined dialog returns no handle — and since the player is locked until they answer, that is a player locked with no way to answer, on every client older than 1.21.6.

With two modes on offer, the screen is a **confirmation**: hardcore is yes, normal is no. That shape core's own fallback renders, so nothing extra is needed.

With three — once lifesteal is enabled — it has to be a `multi_action` button grid, which core declines. dFate therefore ships its own fallback:

**`MultiActionChatFallback`** renders a button grid as a numbered chat prompt. A grid of labels does have a faithful chat equivalent: "type 1, 2 or 3", with each option clickable. It is chained *in front of* core's fallback, so notices and confirmations still go through the implementation core ships; only the grid is handled here.

```
Choose your fate
Welcome, Steve. This choice is made once and cannot be taken back.
 [1] Hardcore
 [2] Lifesteal
 [3] Normal
Type a number between 1 and 3.
```

Anything that is not one of the offered numbers resolves as a **cancel**, not as a pick — the screen decides something permanent, and a typo must not choose for the player. The re-ask sweep then puts the screen back.

> If you add a fourth mode, or any other button, the grid stays covered. If you ever remove that fallback, the screen silently strands every old client again. The test `aButtonGridIsOnlySafeBecauseOfTheCustomFallback` asserts that core's fallback still declines the spec, so that removal fails the build rather than the server.

## Forcing the fallback

DzusillCore can be told to serve every dialog as chat, which is useful for testing what your older players see:

```yaml
# plugins/DzusillCore/config.yml
dialogs:
  force-fallback: true
```

## Where the text lives

All of it in dFate's `messages.yml` — the title, the body, both button labels and both hover tooltips. Dialog text is MiniMessage, same as every chat message, so strings move between the two renderings unchanged.

Two rules for the dialog keys:

- **No `<prefix>`.** A dialog has no chat line to prefix.
- **Use `<newline>` for line breaks.** The body is one string; `<newline>` is a standard MiniMessage tag and works in both the native screen and the chat fallback.

See [messages.yml](/plugins/dfate/configuration/messages/) for the full key list.
