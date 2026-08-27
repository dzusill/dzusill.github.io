---
title: "Requirements"
description: "This is a hard requirement, not a recommendation. The plugin is compiled for Java 25 and an older"
---

| | |
|---|---|
| **Java** | 25 or newer |
| **Server** | Paper or Folia 1.21 or newer |
| **DzusillCore** | required, a hard dependency |
| **Storage** | H2 by default, MySQL optional |
| **PlaceholderAPI** | optional |

## Java 25

This is a hard requirement, not a recommendation. The plugin is compiled for Java 25 and an older
runtime will refuse to load it. Many hosts still default to Java 17 or 21, so check before installing:

```
java -version
```

If your panel offers a Java version selector, set it to 25 and restart before dropping the jar in.

## Paper or Folia

dLive is built against the Paper API, so plain Bukkit and Spigot are not supported. Folia is, and is
declared in `plugin.yml` — every player touch is dispatched to the owning region thread rather than
assuming a single main thread.

## DzusillCore

The framework the plugin runs on. It ships alongside dLive; drop both jars into `plugins/`. dLive will
not enable without it.

## Online mode

Nothing in dLive requires `online-mode: true` **except** the optional [skin face](/plugins/dlive/features/skin-face/).
An offline mode profile carries no skin texture to fetch, so the face silently falls back to the plain
announcement body. Everything else works either way.
