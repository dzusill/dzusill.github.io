---
title: "Admin GUI"
description: "/dms gui opens the admin GUI. /dms gui <mob> opens one mob directly. Opening and viewing needs dmobstats.gui; changing anything needs dmobstats.edit.…"
---

`/dms gui` opens the admin GUI. `/dms gui <mob>` opens one mob directly. Opening and viewing needs `dmobstats.gui`; **changing** anything needs `dmobstats.edit`. Without it every editor is read-only and says so.

## Navigation

```
/dms gui
 └─ Mob list (paged)
     filter: all / hostile / neutral / passive / water / bosses · only enabled · search (type in chat)
     └─ Mob menu
         Enabled toggle · Attributes · Special · Damage · Equipment · Effects · Drops & XP
         Spawn rules · Overrides (world / biome) · Test spawn · Reset to vanilla
         └─ Property list  →  editor for one property (range / chance / weighted)
         └─ Equipment → slot → items      Drops → extra drop
         └─ Overrides → pick a world or biome → the same menus, scoped to that override
```

The mob list shows for each mob whether it is enabled, how many values you changed and how many overrides it has. The mob menu title shows the scope: everywhere, `world <name>` or `biome <name>`.

## Controls

Every number in the GUI works the same way:

| Click | Does |
|---|---|
| **Click** | + small step |
| **Right-click** | - small step |
| **Shift-click** | + large step (shift + right-click = - large step) |
| **Q** (drop key) | Type the **exact value** in chat. The GUI closes for the chat prompt; if you cancel or it times out, nothing changes. |
| **Ctrl+Q** | Remove the entry or unset the value, where the lore says so (a list entry, an item, a drop chance). |

Middle-click is deliberately unused: it only fires in creative mode, so it would not work in survival.

Steps: attributes and most properties have their own steps (shown in the lore); properties without one use `gui.step.small` / `gui.step.large` from [config.yml](/plugins/dmobstats/configuration/config/) (default `1.0` / `10.0`). Chances and weights use the `steps` block of `gui.yml` (chance `0.01` / `0.1`, weight `1` / `10`). Every value you set, by click or by chat, is clamped to the property's **hard limits**, and whole-number properties stay whole.

### Draft, Save and immediate saves

- The range, chance and weighted editors, equipment, effects and drops keep a **draft**. The lore shows *Saved* and *Draft*. Nothing is written until you click **Save**.
- A few buttons save **immediately**: the **Enabled** toggle, the **Vanilla** button of an editor, and **Reset to vanilla** (which first asks for confirmation).

### Adding items: insertion is a copy

For equipment slots and extra drops, hold the item on your cursor and click the **Add** slot, or shift-click the item in your own inventory. The GUI stores a **copy** (as a Base64 item, with all its components). Your own item stays with you and is not consumed.

## Safety

- **Hard limits** on every value; the GUI cannot exceed them.
- **Confirmation** before saving a value above a property's dangerous threshold (for example `scale` above 3, `follow_range` above 64, `movement_speed` above 0.5, creeper `explosion-radius` above 6, slime `size` above 8, `explosion-power` above 4, `damage.dealt-multiplier` above 10, or `damage.taken-multiplier` of 0). Switch it off with `gui.confirm-dangerous: false`.
- **Validation**: a change that would add any problem to the file (past a hard limit, an unknown key, an unreadable item) is refused with the reason.
- **Backup** of the mob file to `backups/<mob>/` before every save.
- **Audit log**: one line per changed key in `logs/changes.log`: who, when, mob, key, old and new value.
- **Two admins at once**: a save checks that the file still has the content you opened. If someone (or a hand edit) changed it in the meantime you get "changed by someone else, reopen" instead of an overwrite.
- Saves keep your comments and every other value in the file.

The Save lore reminds you: **applies to NEW spawns only; mobs that already exist keep their values.**

## Not editable in the GUI

- `custom-name` (file only, MiniMessage).
- `spawn.replace` (shown read-only; edit it in the file).
- `ambient` of an effect.

All are shown with a note and can be changed in `mobs/<mob>.yml`.

## Customising

Layouts, titles, slots, materials and all texts are in `gui.yml` (MiniMessage, `%name%` placeholders, slot `-1` hides a button). See [gui.yml & messages.yml](/plugins/dmobstats/configuration/gui-and-messages/).
