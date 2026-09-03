---
title: "FAQ & Troubleshooting"
description: "In order:"
---

### The donor's head/face is not showing in chat

In order:

1. **Is `player-head-hover: true` in `announcements.yml`?** It defaults to on, but check.
2. **Which style are you expecting?** `player-head-style: pixels` (the default) draws an 8×8 block of coloured squares beside the message; `icon` is Minecraft's own one-character inline head. If you see a name with nothing beside it in either style, the skin was not resolved — see the next points. If you see a tiny head but expected the full face, you are on `icon` style; switch `player-head-style` to `pixels`.
3. **Is the account you're testing with actually resolvable?** A player who is online right now always works — their client sends its own skin at login, independent of your server's `online-mode`. Someone **not** currently online needs a real Mojang UUID: `/donations trigger <player>` on an `online-mode: false` server synthesises a fake UUID for a name it has never seen (Bukkit does this, not this plugin — there is no Mojang lookup involved at all for an unknown name), so there is genuinely no skin to fetch. Pass their real UUID instead: `/donations trigger 069a79f4-44e9-4726-a5be-fca90e38aaf5` (Notch, as an example). The command tells you when it has done this.
4. **Turn on the diagnostic.** Set `debug-chat-json: true` in `announcements.yml`, `/donations reload`, trigger again, and read the `[chat-json]` console lines. A working line contains `"player":{…,"properties":[{"name":"textures",…}]}` for `icon` style, or eight lines of `█` in several colours for `pixels`. If the JSON shows the plain name and nothing else, a `WARNING` line right above it names the exact cause (no textures, Mojang unreachable, etc.).

See [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/).

### A raw key like `invalid-number` shows up in chat instead of a real message

`messages.yml` is missing that exact key. A block near the top of that file — clearly marked "Framework (OberonCore)" — is looked up by the command framework itself whenever it reports a problem, using `%percent%` placeholders rather than this plugin's own `{brace}` convention. If one of those exact key names is absent, core shows the raw key name rather than failing silently. Compare your file against the shipped defaults for that block and restore any missing key with its exact name.

### I upgraded and the purchase chat line still says `{player}`, not `{player_head}`

This self-heals. `events:` in `announcements.yml` is deliberately excluded from the automatic key-merge that runs on every load — an operator's own events must never be silently overwritten — which means a purchase line that already existed before the head feature shipped never picked up the new default on its own. The plugin now detects the exact legacy line and rewrites it in place, once, the first time it loads an `announcements.yml` that still has it; you'll see a one-line log message when it happens. If you had already customised that line yourself, it is left alone — add `{player_head}` to it by hand.

### The webhook stopped responding after I changed the port

`/donations reload` now rebinds the webhook listener when `webhook.port` changes — it was not doing this in earlier builds. Confirm you are on a current jar, and check `/donations doctor` for the listener's actual bind state rather than just the configured port; the two can disagree if a previous bind failed silently (port already in use, for instance).

### A sound configured in `announcements.yml` or `webhooks.yml`-adjacent events does not play

Both the enum-style name (`ENTITY_PLAYER_LEVELUP`) and the registry key (`entity.player.levelup`) are accepted — check the spelling either way. `sound.enabled` also has to be `true` for that event.

### Why does OberonDonations not deliver the package I set up in Tebex?

By design, and it never will. Every store adapter is structurally forbidden from reaching Tebex's queue/command endpoints — this is enforced by an allowlist in the HTTP client, not just left to convention, and it is covered by tests. Tebex's own plugin has to stay installed and running; it is the only thing that ever runs a package command. `/donations trigger` makes this explicit in its own reply: "this announces only — it does not deliver a package."

### Should I turn on CraftingStore support?

Only if you actually run CraftingStore and are prepared to verify it yourself first. It ships disabled (`store.craftingstore-key: ''`) because its payload shapes have never been confirmed against a real account — enable it, run a real test purchase, and check the resulting purchase row and announcement look right before trusting it in production.

### My leaderboard/goal total looks wrong

Most likely it is not wrong — it is a sum across more than one currency. `/donations currencies` shows exactly how your history splits. Aggregates are never converted; only a single purchase's own `{amount}` is guaranteed to be in the currency it was actually paid in.

### A donation board with `npc.type: skin` shows plain text, not a skinned body

This depends entirely on which NPC plugin is installed and has only been verified end-to-end on Citizens — FancyNpcs and ZNPCsPlus may render native placeholder text instead in some configurations. See [Known Limitations](/plugins/oberondonations/limitations/#real-gaps-being-honest-about-them). A board with `npc.type: head` (a player skull on an armour stand, no NPC plugin needed) always works, as does the default `TEXT_DISPLAY` renderer.

### An imported figure disagrees with what Tebex's dashboard shows now

Run `/donations reconcile [count]` — it overwrites stored amounts with whatever the store reports right now for those transaction ids. Use it deliberately; it is not run automatically, since replacing a stored figure with a live one should be an operator's choice, not a background job's.

### Migrating from PerfDonation — will I lose anything?

No, as long as the WAL sidecar files travel with the database. SQLite in WAL mode keeps recently-committed writes in a separate `-wal` file next to the main `.db` — reading only the `.db` file gives you a snapshot that is missing whatever was written most recently. Copy `perfdonation.db`, `perfdonation.db-wal` and `perfdonation.db-shm` together. See [Migrating from PerfDonation](/plugins/oberondonations/features/migrating-from-perfdonation/).

### Does `/donations trigger` count toward real statistics?

Yes — a simulated purchase goes through the exact same pipeline a real one does, including donor stats, goals, the Hype Train and GG Wave. That is the point: it is how you verify the whole chain works, not just the announcement text. Use `/donations seedtest` / `/donations cleartest` instead for volume-testing leaderboards and boards without touching real figures, since those are scoped and can be cleanly removed afterward.

### Does it work on Folia?

Yes — `plugin.yml` declares `folia-supported: true`. Every scheduled task and every per-player effect (particles, fireworks, sounds, the donor's own head resolution) goes through the region-aware scheduler rather than a single global one.

### Can I use `/reload`?

Use `/donations reload` instead. It reloads every configuration file for this plugin specifically, including rebinding the webhook listener if its port changed — a generic server `/reload` does neither reliably for a plugin this size.
