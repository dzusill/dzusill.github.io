---
title: "Reloading"
description: "Permission dmobstats.reload. It re-reads config.yml, gui.yml, messages.yml and every mob file, validates them, and swaps in the new profiles. The file…"
---

```
/dms reload
```

Permission `dmobstats.reload`. It re-reads `config.yml`, `gui.yml`, `messages.yml` and **every mob file**, validates them, and swaps in the new profiles. The file reading happens off the main thread; the swap is atomic, so spawns never see a half-loaded state.

```
[dMobStats] Reloading mob profiles...
[dMobStats] Reloaded 82 mob profiles. Warnings: 0 (see console). Existing mobs are not changed.
```

- **Existing mobs are never changed.** Reload only affects mobs that spawn afterwards.
- Warnings (clamped values, unknown keys...) are listed in the console; `/dms validate` shows them with line numbers.
- If a reload is already running you get "A reload is already running".
- A missing mob file is generated again, and new keys from a plugin update are added with `vanilla`; your values are never touched.
- A mob file with invalid YAML keeps that mob vanilla until you fix it.
- `/dms debug` is reset to the `debug` value in `config.yml` by a reload.

You do not need to reload after a GUI save or a preset apply: they refresh the profiles themselves.
