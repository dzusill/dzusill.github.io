---
title: "FAQ & Troubleshooting"
description: "dLottery requires MySQL or MariaDB — there's no flat-file mode. Check database.yml has correct credentials and enabled: true, and that the database server…"
---

### The plugin won't start / database errors

dLottery **requires** MySQL or MariaDB — there's no flat-file mode. Check `database.yml` has correct credentials and `enabled: true`, and that the database server is reachable. The schema is created automatically on a successful connection. See [database.yml](/plugins/dlottery/configuration/database/).

### Tickets cost money but nothing happens

You need [Vault](https://www.spigotmc.org/resources/vault.34315/) **and** an economy plugin (EssentialsX, CMI, …). Without an economy provider, purchases can't be charged.

### A player can only buy one ticket

That's the default cap. Grant a VIP tier permission (`dlottery.tickets.iron`/`gold`/`diamond`/`emerald`) for a higher cap, or raise the numbers under `maxTickets` in [settings.yml](/plugins/dlottery/configuration/settings/).

### The round drew with no winner

Either no tickets were sold, or fewer than `minPlayers` unique players joined — in which case **everyone is refunded**. Lower `minPlayers` if your server is small. See [How a Round Works](/plugins/dlottery/features/how-a-round-works/).

### A player won while offline — did they lose the prize?

No. Offline winners get a **pending payout** and are paid automatically on their next login. See [Winning & Payouts](/plugins/dlottery/features/winning-and-payouts/).

### I changed the ticket price but the current round still uses the old one

Settings apply to the **next** round. End the current one with `/lottery shuffle` or `/lottery reset` to apply changes immediately. See [Reloading](/plugins/dlottery/configuration/reloading/).

### How is the winner chosen?

By weighted random selection — your odds equal your share of all tickets. Buying more tickets improves your chance but never guarantees a win.

### Can I run one lottery across several servers?

Point them at the same database. Just make sure only one server runs the draw timer to avoid double draws. See [database.yml](/plugins/dlottery/configuration/database/).

### How do I end a round early or cancel it?

`/lottery shuffle` draws now; `/lottery reset` cancels and refunds everyone. Both need op. See [Admin Controls](/plugins/dlottery/features/admin-controls/).
