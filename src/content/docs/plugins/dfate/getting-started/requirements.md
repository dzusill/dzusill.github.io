---
title: "Requirements"
description: "Native dialogs need a 1.21.6+ client (protocol 771). Anything older — including players coming through a translating proxy — is routed to the chat fallback…"
---

## Required

| Requirement | Version | Why |
|---|---|---|
| Paper / Purpur / Folia | **1.21.x** | dFate is a Paper plugin; Folia is supported (`folia-supported: true`). |
| Java | **21+** | The jar is compiled to Java 21 bytecode. |
| DzusillCore | **1.12.0+** | Ships as a separate jar. dFate resolves its config, messages, commands, scheduler and — critically — its `DialogService` from it. |

> **DzusillCore is not shaded into dFate.** It is its own plugin jar in `plugins/`. Older builds of core have no dialog package at all, so a server still running 1.3.x will fail to enable dFate. Check with `/version DzusillCore`.

## Optional

| Plugin | What you gain without it / with it |
|---|---|
| **dDialogs** | Without it the choice screen still works — DzusillCore serves it as a clickable chat prompt. With it, players get the real Minecraft dialog screen. Strongly recommended. |
| **AdvancedBan / LiteBans / CMI** | The ban is a console command you configure, so any of them works. Without one, dFate falls back to the server's own ban list (see [Hardcore Death](/plugins/dfate/features/hardcore-death/)). |
| **PlaceholderAPI** | Enables the 8 `%dfate_*%` placeholders. |
| **ViaVersion** | Lets dDialogs tell which connected clients are old enough to need the chat fallback. |
| **MySQL / PostgreSQL** | Shares the chosen mode across a network instead of one server's flat file. |

## Client versions

Native dialogs need a **1.21.6+ client** (protocol 771). Anything older — including players coming through a translating proxy — is routed to the chat fallback automatically, per player. You do not configure this and there is no version gate to set: the decision is made per call, per player. See [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/).
