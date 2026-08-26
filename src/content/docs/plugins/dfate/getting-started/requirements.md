---
title: "Requirements"
description: "The native dialog API arrived in 1.21.6. dFate compiles against 1.21.11 but does not require it: everything touching that API sits behind a lazy boundary…"
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
| **dDialogs** | **Not needed.** dFate renders the native choice screen itself on 1.21.6+. If dDialogs is installed it takes over, registered at a higher service priority — it is the dedicated implementation and a server running it wants it everywhere. |
| **AdvancedBan / LiteBans / CMI** | The ban is a console command you configure, so any of them works. Without one, dFate falls back to the server's own ban list (see [Hardcore Death](/plugins/dfate/features/hardcore-death/)). |
| **PlaceholderAPI** | Enables the 8 `%dfate_*%` placeholders. |
| **ViaVersion** | Lets dDialogs tell which connected clients are old enough to need the chat fallback. |
| **MySQL / PostgreSQL** | Shares the chosen mode across a network instead of one server's flat file. |

## Server and client versions

The native dialog API arrived in **1.21.6**. dFate compiles against 1.21.11 but does not require it: everything touching that API sits behind a lazy boundary that is only loaded once a version check passes, so the plugin still enables on 1.21.1–1.21.5 and serves the choice screen as chat there.

Native dialogs also need a **1.21.6+ client** (protocol 771). Anything older — including players coming through a translating proxy — is routed to the chat fallback automatically, per player. You do not configure this and there is no version gate to set: the decision is made per call, per player. See [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/).
