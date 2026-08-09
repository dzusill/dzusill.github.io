---
title: "FAQ & Troubleshooting"
description: "Not from a retry. That is what the receipt ledger exists to prevent: the execution key is recorded on disk before dStore reports success, so a retried job…"
---

### A player bought something and never got it.

1. `/dstore status` — is the worker healthy and talking to the API?
2. `/dstore poll` — force a poll rather than waiting.
3. Still nothing? The job is not queued on the API side. Check the order in the website admin panel.
4. If the job exists but keeps failing, read the console — the failure reason is logged with the job id.

### Could a player get their purchase twice?

Not from a retry. That is what the [receipt ledger](/plugins/dstore/features/receipt-ledger/) exists to prevent: the execution key is recorded on disk before dStore reports success, so a retried job replays the stored result instead of executing again.

The one way to break it is deleting `receipts.db` while a job is in flight. Don't.

### Do I need DzusillCore?

No. dStore is standalone — one jar, one config.

### Do I need dWebLink?

Not technically, but in practice yes: the store needs to know which website account owns which Minecraft account, and that is dWebLink's job.

### Can I reuse dWebLink's API key?

No, and the config comment says so. Store credentials can grant ranks and items; account-linking credentials cannot and must not.

### Rank products fail.

LuckPerms is not installed, or the group named by the product does not exist. Entitlements go through the LuckPerms API, so without it the action has nothing to call.

### Console-command products fail.

Check `execution.console-commands-enabled`. When `false`, those jobs deliberately fail rather than silently doing nothing.

### An item purchase for an offline player.

Stays queued. Items need an online player; the job is delivered once they join.

### What is a "main thread timeout"?

An action that needs the server tick (items, console commands) exceeded `execution.main-thread-timeout-seconds`. The job fails instead of blocking the server. Usually it means another plugin's command is hanging — raising the timeout hides the symptom, not the cause.

### Can I move the server?

Yes. Copy the whole `plugins/dStore/` folder, including `receipts.db`.

### Can two servers share one `receipts.db`?

No. Each installation has its own execution keys. Give every server its own installation ID and its own ledger.

### Does it work on Folia?

Yes. Main-thread actions are scheduled on the player's region scheduler.

### Does `/dstore update` restart the server?

No. It downloads, verifies the SHA-256 and stages the jar. The update applies on your next restart.

### The updater refuses to download.

By design, it requires HTTPS (localhost excepted), a valid 64-character SHA-256, and a jar under 50 MB. Any of those failing aborts the install and leaves the running jar untouched.

### How big does `receipts.db` get?

One small row per delivered purchase. A server doing a thousand sales a month adds a few hundred KB a year.

## Next

- [Credits](/plugins/dstore/credits/)
