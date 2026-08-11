---
title: "How it works"
description: "Useful if you are extending dDialogs, or wondering why the rendering is not simply part of DzusillCore."
---

Useful if you are extending dDialogs, or wondering why the rendering is not simply part of DzusillCore.

## Why rendering is a separate plugin

DzusillCore shades and relocates `net.kyori` to `me.dzusill.core.lib.kyori`. Every typed dialog builder in the Paper API takes a **native** `net.kyori` component:

```java
DialogBase.builder(net.kyori.adventure.text.Component)
ActionButton.create(net.kyori.adventure.text.Component, …)
Audience#showDialog(net.kyori.adventure.dialog.DialogLike)
```

Core calling any of those has its bytecode rewritten by the shade relocator, and the rewritten call fails at runtime. Not a style problem — a hard one.

dDialogs is not shaded, so it calls the API directly. It also gets a second benefit: it parses MiniMessage with the **server's own** instance, which always produces the component format the running server expects. Core's bundled Adventure is older and emits a pre-1.21.5 format, which would be wrong on the wire.

## What crosses the boundary

Only plain core types — `DialogSpec` and friends are records of `String`, primitives and `java.util` collections. No component, no NBT, no SNBT. That is what makes the boundary safe against the relocation.

```
DzusillCore (relocated)                    dDialogs (unrelocated)
  DialogService                              PaperDialogBackend
  DialogSpec (records) ───── spec ─────────►   MiniMessage → native Component
  PendingDialogs (tokens)                      → typed builders → showDialog()
  DialogBackend (SPI)  ◄─── ServicesManager ─┤
  DialogCallbackSink   ◄─── onSubmit ────────┤ Paper's DialogActionCallback
```

## Registration and lookup

Registration goes through Bukkit's `ServicesManager`, not core's own registry. dDialogs declares `depend: [DzusillCore]`, so core finishes enabling *before* this plugin exists — anything core checked during its own startup would always miss. Core resolves the backend lazily on first use and calls `attach` once.

The lookup is invalidated on `PluginDisableEvent`; otherwise core would keep a reference into a dead class loader and the next click would fail with `NoClassDefFoundError`.

## Callbacks need no listener

Paper offers `DialogAction.customClick(DialogActionCallback, ClickCallback.Options)`, which correlates the response server-side and hands it straight back:

```java
void accept(DialogResponseView response, Audience audience)
```

That removes what the design originally assumed was necessary: a `PlayerCustomClickEvent` listener, payload decoding, and reflection to read `Key`/`BinaryTagHolder` (which return relocated-hostile types). None of it is needed.

**Core still validates its own token on top.** Paper's correlation proves the packet is well-formed, not that the client chose to send it honestly — a modified client can send a response at any time. The identity used is the `Audience` Paper resolved, never the player the dialog was rendered for.

## Version gating

`BackendModule` checks `isAtLeast(1, 21, 7)` before touching anything dialog-related, and only then loads `BackendFactory`. That indirection matters: naming `PaperDialogBackend` in a class that always loads would link the whole Paper dialog API on class load, and an older server would throw `NoClassDefFoundError` before the version check ever ran.

The same lazy pattern applies to `ViaVersionClientSupport`, which is only constructed when ViaVersion is actually installed.

## What cannot be unit-tested

Every Paper dialog factory routes through `DialogInstancesProvider.instance()`, a singleton the **running server** supplies. Calling one off-server throws `NoSuchElementException: No value present`, so the translator has no in-process tests. MockBukkit cannot stand in either — the version that understands this paper-api line needs a JUnit 6 migration, and it does not implement the dialog provider regardless.

Translation is therefore verified live via `/coredialog full`. Everything that *can* be tested in process — spec validation, token security, routing, the fallbacks — lives in DzusillCore and is covered there.
