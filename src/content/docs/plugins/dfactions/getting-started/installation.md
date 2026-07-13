---
title: "Installation"
description: "A step-by-step guide from an empty server to a running, configured dFactions install."
---

A step-by-step guide from an empty server to a running, configured dFactions install.

## Step 1 — Get the plugin jar

**Option A — download a release (recommended).** Grab the latest
`dFactions.jar` from the distribution page (e.g.
[Modrinth](https://modrinth.com/plugin/pvpindex-factions)).

**Option B — build from source.** With JDK 21+ and Maven:

```bash
git clone https://github.com/dzusill/dFactions.git
cd dFactions
mvn package
```

The ready-to-use shaded jar is written to `target/dFactions.jar`. All dependencies
(H2, HikariCP, Adventure, bStats…) are bundled inside it — nothing else to install.

## Step 2 — Install it

1. Stop your server.
2. Copy the jar into the server's `plugins/` folder:

   ```
   plugins/
   └── dFactions.jar
   ```

3. Start the server once. On first launch dFactions generates its data folder:

   ```
   plugins/dFactions/
   ├── config.yml
   ├── database.yml
   ├── gui.yml
   ├── roles.yml
   ├── notifications.yml
   ├── pre-defined.yml
   ├── messages/            # messages_en.yml (English-only for now)
   └── data/                # H2 database (created on first use)
   ```

4. Confirm it loaded — `/plugins` should list **dFactions** in green with no console errors.

> The plugin appears as **dFactions** in `/plugins` and stores its data in `plugins/dFactions/`.

## Step 3 — First configuration

Open `plugins/dFactions/config.yml`. Defaults are playable, but review:

| Setting | Path | Default |
|---|---|---|
| Server language | `factions.language.default` | `en` |
| Max members | `factions.max-members` | `50` |
| Create cost | `factions.economy.cost-create` | `50.0` |
| Claim cost | `factions.economy.cost-claim` | `100.0` |

Apply changes with `/fa reload` (a few structural settings need a full restart — noted in the file).

## Step 4 — (Optional) Economy with Vault

Money features (create/claim costs, bank, tax, interest, shields) use an economy provider via Vault:

1. Install [Vault](https://www.spigotmc.org/resources/vault.34315/).
2. Install a Vault-compatible economy plugin (e.g. EssentialsX Economy).
3. Restart — dFactions detects Vault automatically.

Without Vault the plugin still runs; money features simply no-op.

## Step 5 — (Optional) Enable advanced systems

These ship **off by default**. In `config.yml`:

```yaml
factions:
  beacon:       { enabled: true }   # physical Beacon HQ
  shield:       { enabled: true }   # purchasable timed shields
  war:          { enabled: true }   # declared wars
  supply-drops: { enabled: true }   # timed world loot drops
  economy:
    tax:      { enabled: true }
    interest: { enabled: true }
```

Read the linked feature pages before enabling. Then `/fa reload` or restart.

## Step 6 — (Optional) PlaceholderAPI

Install [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) to use the
`pvpindex` expansion in scoreboards, tab and holograms. See [Placeholders](/plugins/dfactions/placeholders/).

## Upgrading

1. Stop the server. 2. Replace the old jar with the new one. 3. Start — config and schema migrate
forward automatically; new keys get defaults, existing values are preserved.

> **Back up** `plugins/dFactions/data/` and `config.yml` before major upgrades.

Next: **[Quick Start](/plugins/dfactions/getting-started/quick-start/)**
