---
title: "Economy"
description: "Optionally charge players for home actions. Requires Vault + an economy plugin. Off by default."
---

Optionally charge players for home actions. Requires [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin. Off by default.

```yaml
Settings:
  Economy:
    Enabled: false
    Currency: Vault
    SlotsPerPurchase: 1
    Costs:
      SetHome: 0
      Teleport: 0
      Rename: 0
      BuySlot: 1000
    Confirm:
      Teleport: true
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `false` | Master toggle. With it off, everything is free. |
| `Currency` | `Vault` | Economy provider. |
| `SlotsPerPurchase` | `1` | Home slots granted per [purchase](/plugins/dhomegui/features/home-limits/#buying-slots). |
| `Costs.SetHome` | `0` | Charge to create a home. |
| `Costs.Teleport` | `0` | Charge to teleport. |
| `Costs.Rename` | `0` | Charge to rename. |
| `Costs.BuySlot` | `1000` | Price of one slot purchase. |
| `Confirm.Teleport` | `true` | Ask the player to re-run before paying to teleport. |

A cost of `0` means that action is free even with economy enabled. When a charge applies, the player sees a confirm prompt (*"… costs X! Run the command again to confirm."*), then *"X was taken from your balance."*

## Bypass

`dhomegui.bypass.cost` exempts a player from **all** charges — set, teleport, rename and buying slots.

> Without enough money, the action is refused with *"You don't have enough money to do that!"*
