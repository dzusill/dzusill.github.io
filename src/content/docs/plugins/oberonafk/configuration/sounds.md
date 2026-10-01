---
title: "sounds.yml"
description: "Everything the plugin plays that is not a message's own sound is referenced by an alias defined"
---

Everything the plugin plays that is not a message's own sound is referenced by an **alias** defined
here, never by a raw sound key, so a sound is retuned in one place and every caller follows.

```yaml
enabled: true

sounds:
  enter:
    sound: block.beacon.activate
    volume: 0.6
    pitch: 1.4
```

| Key | Meaning |
|---|---|
| `enabled` | `false` silences the whole plugin |
| `sound` | A plain resource key — any sound the server knows, resource-pack sounds included. Blank silences that alias |
| `volume`, `pitch` | Numbers, `1.0` by default |

A blank or unknown alias is silence, never an error: muting one event must not need a code change or
fill the console.

## Aliases

| Alias | Played when |
|---|---|
| `enter` | Stepping into a zone |
| `leave` | Stepping out of it |
| `reward` | A reward was given |
| `storage` | An item went to the claim storage |
| `error` | The claim storage was full and an item was not given |
| `warmup` | Every second of the `/afk` warm-up |
| `teleport` | Arriving after `/afk` |
| `click` | The previous / next / close buttons of the claim menu |

[`config.yml`](/plugins/oberonafk/configuration/config/#notifications) chooses which alias each zone notice uses, and
[`gui.yml`](/plugins/oberonafk/configuration/gui/) which one each button uses. You can add aliases of your own and point either at them.

## What is *not* here

The sound of a command reply, an error or a success belongs to that message and is set in
[`Presentation`](/plugins/oberonafk/configuration/config/#presentation) in `config.yml` — by category (`ERROR`, `INFO`, …) or per message
key. There, `Sound.Name` takes the raw name directly (`ENTITY_VILLAGER_NO` or `entity.villager.no`).
The shipped config plays an item pick-up sound for `claim.claimed` and `claim.claimed-all`.
