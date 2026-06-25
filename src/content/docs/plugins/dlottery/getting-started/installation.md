---
title: "Installation"
description: "Make sure you have Vault + an economy plugin installed, and a MySQL/MariaDB database with credentials ready."
---

## 1. Prerequisites

Make sure you have **Vault** + an economy plugin installed, and a **MySQL/MariaDB** database with credentials ready.

## 2. Generate the config

1. Drop `dLottery-1.2.jar` into `plugins/`.
2. Start the server once to generate the config files, then stop it.

```
plugins/dLottery/
├── settings.yml      # lottery behaviour (round length, price, tax, VIP tiers)
├── database.yml      # MySQL connection
└── messages.yml      # player-facing text
```

## 3. Configure the database

Edit `plugins/dLottery/database.yml` with your MySQL credentials:

```yaml
enabled: true
type: MYSQL
host: localhost
port: 3306
database: dlottery
username: root
password: ""
```

See [database.yml](/plugins/dlottery/configuration/database/).

## 4. Configure the lottery

Edit `plugins/dLottery/settings.yml` — round duration, ticket price, tax, VIP ticket caps and reminders. See [settings.yml](/plugins/dlottery/configuration/settings/).

## 5. Start

Start the server. The **schema is created automatically** from `schema-mysql.sql` on first connect, and a round opens immediately. Verify with:

```
/lottery
```

Next: the [Quick Start](/plugins/dlottery/getting-started/quick-start/).
