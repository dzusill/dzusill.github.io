---
title: "Installation"
description: "On the first successful connection the migration runner creates every table it needs."
---

1. Install **DzusillCore** in `plugins/`.
2. Drop `dGems.jar` into `plugins/`.
3. Start the server once to generate the config files.
4. Fill in `database.yml` and enable it.
5. Restart.

On the first successful connection the migration runner creates every table it needs.

---

## database.yml

```yaml
enabled: true
type: mysql          # or postgresql
host: "127.0.0.1"
port: 3306
database: "dgems"
username: "dgems"
password: "..."
```

The database user needs `CREATE TABLE` on first start; after that, read/write is enough.

> ⚠️ If `enabled` is false or the connection fails, dGems does not enable. This is intentional — see [Requirements](/plugins/dgems/getting-started/requirements/).

## Verifying it worked

```
/gems balance
```

You should see a zero balance in your configured currency format. Then:

```
/gems admin give <you> 100
/gems balance
/gems admin audit
```

The audit log should show the give, with you as the actor.

## Naming your currency

Before players ever see it, set the name in `config.yml`:

```yaml
currency:
  name-singular: "Gem"
  name-plural: "Gems"
  format: "<gradient:#a855f7:#ec4899><bold>%amount%</bold> %currency%</gradient>"
```

`format` is MiniMessage and applies everywhere an amount is shown — chat, GUIs, placeholders. Change it once and the whole plugin follows.

## Stocking the shop

The shop starts empty. Add items with:

```
/gems admin items create
```

See [The Shop](/plugins/dgems/features/shop/).

## Updating

Replace the jar and restart. New config keys are merged with their comments; your values are preserved. Schema migrations run automatically.

## Next

- [Quick Start](/plugins/dgems/getting-started/quick-start/)
