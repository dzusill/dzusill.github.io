---
title: "Installation"
description: "If config.yml is invalid, the plugin refuses to enable rather than starting with half a tool set:"
---

1. Install **OberonCore** (the DzusillCore framework jar) into `plugins/`. OberonTools is a hard dependency of it and will not enable without it.
2. Drop `OberonTools.jar` into `plugins/`.
3. Restart the server. (`/reload` is not supported — recipes and permission nodes are registered at enable time.)
4. Check the console:

```
  OberonTools v1.0.0
  Powered by OberonCore

[OberonTools] Loaded 2 custom tool definition(s).
```

If `config.yml` is invalid, the plugin **refuses to enable** rather than starting with half a tool set:

```
[OberonTools] Invalid config.yml: tools.sponge_bucket: item.material contains invalid material 'BUKCET'
```

Every problem found in one pass is reported together, so you fix the file once rather than restart per typo.

5. Verify in-game:

```
/oberontools list
/oberontools give <you> sponge_bucket
/oberontools inspect
```

## Files it creates

```
plugins/OberonTools/
├── config.yml     # processing budget, tool definitions, message presentation
└── messages.yml   # command output, tool feedback, expiry wording
```

Nothing else. OberonTools stores no player data — everything a tool knows about itself lives in the item's own persistent data.

## Updating the jar

Stop the server, replace the jar, start it again.

`tools` is an **ignored section**: on update, new keys are merged into every other section of `config.yml`, but the `tools` block is left exactly as you wrote it. A tool you deleted stays deleted. The trade-off is that a new *example* tool shipped with an update will not appear either — copy it out of the jar's bundled `config.yml` if you want it.
