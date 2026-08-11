---
title: "Requirements"
description: "What your server needs before dDialogs can draw anything."
---

## The server

**Paper 1.21.7 or newer.**

Dialogs reached the *client* in 1.21.6, but the server-side API for building them only arrived in 1.21.7. Spigot does not have it at all.

On anything older the plugin still loads. It logs that native rendering is unavailable and steps aside — plugins asking for dialogs keep working through chat prompts. Nothing breaks; you simply do not get screens.

## DzusillCore

**Version 1.4.0 or newer, installed as its own jar** next to dDialogs.

dDialogs implements an interface that lives in core, so core must load first. This is a hard dependency — without it the plugin will not enable.

:::caution[A plugin that shades core will never upgrade]
If a plugin bundles ("shades") DzusillCore inside its own jar instead of depending on a separate core jar, it carries a private copy of the dialog interfaces. Bukkit matches services by class identity, so dDialogs' registration is invisible to it and it will always use the chat fallback.

Nothing breaks — it just never improves. The fix is to switch that plugin to `provided` scope and install DzusillCore separately.
:::

## The client

**1.21.6 or newer** to see a dialog at all.

**1.21.9 or newer** for inline icons — `<item:diamond>`, `<sprite:block/dirt>`, `<head:Steve>`. On an older client the icon simply renders as nothing; the dialog itself is fine. That makes icons safe to use on a mixed-version server.

## Optional, but worth having

**PlaceholderAPI** — without it, `%player_name%` and a dozen other built-ins still work (dDialogs expands those itself), but anything from another plugin renders literally as `%some_placeholder%`. See [Placeholders](/plugins/ddialogs/features/placeholders).

**ViaVersion** — lets dDialogs read each player's real client version. Without it every client is assumed to speak the server's protocol, which is true unless a translating proxy is involved. With a proxy and no ViaVersion, a 1.20 player would be sent a screen they cannot draw and would see nothing at all.

You can check which mode you are in from the startup line:

```
[dDialogs] Native dialog rendering enabled: paper-typed (1.21.11, client-gate=none)
```

`client-gate=none` means "no version detection available, assume everyone is fine". With ViaVersion it reads `client-gate=viaversion`.
