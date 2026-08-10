---
title: "Reloading"
description: "Everything applies immediately. There is nothing here that needs a restart."
---

```
/oberonkills reload
```

```
Reloaded. 24 message key(s) active.
```

## Everything applies immediately

- Every message, in all three sets
- Whether the plugin rewrites death messages at all
- The item name mode and hover
- The vanilla fallback
- Rank prefixes and their order

**There is nothing in this plugin that needs a restart.** No command names come from the config, no listener is
conditional, and there is no database whose backend is chosen at startup.

A reload builds a new set of messages and swaps it in, so a death being processed at that moment finishes against the
old one.

## If the count looks wrong

```
Reloaded. 3 message key(s) active.
```

A number far lower than you expect means entries were skipped — an empty value, or a key whose content is neither a
string nor a list. Check the file, fix it, reload again.

`0` means nothing loaded at all, and every death will use its vanilla message. The console says so at startup:

```
[OberonKills] No death messages are configured; vanilla messages will be used.
```

## Checking the result

```
/oberonkills status
/oberonkills preview pvp bow
```

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into
the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
