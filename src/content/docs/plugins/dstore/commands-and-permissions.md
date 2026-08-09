---
title: "Commands & Permissions"
description: "---"
---

---

## Commands

| Command | Description |
|---|---|
| `/dstore` | same as `/dstore status` |
| `/dstore status` | worker state and last contact with the API |
| `/dstore poll` | schedule an immediate poll instead of waiting for the interval |
| `/dstore reload` | reload `config.yml` |
| `/dstore update` | download and stage the latest jar (applies on restart) |

All five run from console as well as in game.

---

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dstore.admin` | `op` | the entire `/dstore` command |

There is one permission on purpose. Every subcommand is administrative — there is nothing here a normal player should reach. Players interact with dStore only by buying something on the website.

---

## LuckPerms example

Give a staff group operational access without full op:

```
lp group staff permission set dstore.admin true
```

---

## Typical uses

**A customer says their purchase never arrived.**

```
/dstore status
/dstore poll
```

If status is healthy and a forced poll delivers nothing, the job is not queued on the API side — check the order in the website admin panel.

**You just changed credentials.**

```
/dstore reload
/dstore status
```

**You are shipping a new build.**

```
/dstore update
```

then restart when convenient.

## Next

- [FAQ & Troubleshooting](/plugins/dstore/faq/)
