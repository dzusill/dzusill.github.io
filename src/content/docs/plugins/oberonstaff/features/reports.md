---
title: "Player Reports"
description: "/report captures what was happening at the moment it was filed, merges duplicates about the same player, and gives staff a punish button that can only run what you configured."
---

`/report <player>` is a ticket with a suspect attached. It runs the same wizard, lands in its own queue (`/reports`), and carries evidence the plugin collected the instant it was filed.

---

## Naming the player

Two ways, both valid:

```
/report xX_Griefer_Xx        names them up front
/report                      the wizard asks who
```

`/report` **tab-completes** the name from players online. The list leaves out anybody vanished from you — suggesting a hidden staff member's name would tell the whole server they are online — and leaves out yourself, since reporting yourself is refused anyway.

A name the server has never seen is **still accepted**. It carries no evidence and cannot merge, but "I misspelled the cheater's name" should not become "the server would not let me report them".

Reporting yourself is refused on both paths — typing your own name into the wizard's question is caught the same way as typing it on the command line, including on the second attempt where a misspelled name would otherwise be taken as written. An escape hatch is right for a typo and wrong for a rule.

:::note[Evidence and the two paths]
Naming the player on the command line freezes the evidence **immediately**. Answering the wizard's question instead freezes it the moment that answer lands — the earliest anything could know who to look at, but a few seconds later than the command-line form. If the timing matters to you, teach staff and players the `/report <player>` form.
:::

---

## What a report captures

A player reporting somebody is usually watching them do it. By the time staff open the report, the cheater has moved, the chat has scrolled, and the moment is gone.

So evidence is frozen **as soon as the suspect is known** — for `/report <player>`, before the wizard asks anything at all:

| Evidence | What it is |
|---|---|
| **Location** | Where the reporter was standing, so staff can teleport to it |
| **Nearby players** | Everybody within `Nearby-Players-Radius` at that moment |
| **Chat history** | The last `Chat-History-Lines` lines the suspect said |
| **Anticheat flags** | Recent detections against the suspect, if an anticheat is hooked |

```yaml
Reports:
  Evidence:
    Location: true
    Nearby-Players-Radius: 32
    Chat-History-Lines: 15
```

Staff see it as a panel in the ticket detail menu, grouped by kind. It is staff-only and appears on reports only.

### Proof the player supplies

Separately from what the plugin collects, the wizard asks for proof. That question is a `LINK`, and two independent settings decide how hard it pushes:

```yaml
- Id: proof
  Prompt: "Proof? (a link, or type skip)"
  Type: LINK
  Optional: true
  Require-Link: true
```

| `Optional` | `Require-Link` | What the player can answer |
|---|---|---|
| `true` | `true` | a link, or nothing *(shipped default)* |
| `true` | `false` | anything at all, or nothing |
| `false` | `true` | a link, and they cannot finish without one |
| `false` | `false` | something, but it need not be a URL |

**`Require-Link: false` is the one to reach for** if your players screenshot to Discord rather than to an image host. Insisting on a URL there turns a real report into no report — "it's on my discord, same name" is worth keeping.

The type still decides how the answer is drawn for staff, so an answer that happens to be a link stays clickable either way.

Leaving `Require-Link` out means `true`, so a config written before this setting existed keeps asking for a link.

---

## Duplicates

Five people reporting the same cheater at once should be one report, not five.

```yaml
Reports:
  Duplicates:
    Merge-Window-Minutes: 10
    Escalate-After-Reporters: 3
    Escalate-To: URGENT
```

A second report about the same player within the window is **merged into the open one**: the new reporter is recorded, their evidence is attached, and the reporter count goes up. They are told their report was added to an existing one rather than refused.

Once `Escalate-After-Reporters` people have reported the same player, the priority jumps to `Escalate-To`. Three independent people is a much stronger signal than one, and the queue should say so.

The reporter count is read with a `COUNT(*)` rather than incremented, so it cannot drift, and merging is guarded per suspect so two reports filed in the same tick cannot both create a ticket.

---

## Anticheat flags

The plugin has **no compile-time dependency on any anticheat**. Two ways in, both optional:

### Listening for a flag event

Name the event class, and the plugin registers a listener for it reflectively if the class exists:

```yaml
Reports:
  Evidence:
    Anticheat:
      Enabled: true
      Flag-Event-Classes:
        - "me.frep.vulcan.api.event.VulcanFlagEvent"
        - "com.deathmotion.totemguard.event.FlagEvent"
```

A class this server does not have is skipped silently — it is not an error to not run Vulcan.

### The command bridge

For anything that cannot be listened to, most anticheats can run a command on detection. Point it at:

```
/oberonstaff-flag <player> <check> <violations>
```

```yaml
Reports:
  Evidence:
    Anticheat:
      Command-Bridge: true
```

:::caution[Console only]
`/oberonstaff-flag` refuses anything that is not the console — checked on the sender itself, not on a permission, so no node can be misconfigured into letting a player fake flags against somebody. It is silent to players and does not appear in tab completion.
:::

Flags are held in memory for a configurable window and attached to any report filed about that player during it. Nothing is stored otherwise.

---

## The punish button

If `Reports.Punishments` is on, the report detail menu gets a **Punish** button opening a list of the actions you configured:

```yaml
Reports:
  Punishments:
    Enabled: true
    Close-On-Punish: true
    Actions:
      - Name: "<red>Ban"
        Icon: NETHERITE_SWORD
        Command: "ban %target% Cheating [#%ticket%]"
      - Name: "<gold>Tempban 7d"
        Icon: IRON_SWORD
        Command: "tempban %target% 7d Cheating [#%ticket%]"
```

Each entry shows **the exact command it will run** in its lore, and clicking asks for confirmation first. A staff member should never be able to ban somebody without having read what they were about to do.

Works with any punishment plugin — LiteBans, AdvancedBan, CMI, LibertyBans, BanManager — because it dispatches a console command rather than calling an API. The command simply has to exist on your server.

Every use is written into the ticket thread, so the record of why somebody was banned lives next to the ban.

### What the button cannot be talked into

This is the one place in the plugin that dispatches a console command, so it is worth knowing what holds it shut:

- **Presets only.** The template comes from `config.yml` and nowhere else. No method takes a command from a caller, so no GUI, no chat line and no argument can become one. The action is re-checked against the configured list at dispatch, so a forged one is refused.
- **No player text is substituted.** `%target%` and `%staff%` are names the *server* resolved; `%ticket%` is a number. A ticket title is typed by a player, so `%reason%` is deliberately **not** a placeholder — otherwise it would be an injection point straight into the console.
- **Names are validated.** Anything that is not a plausible Minecraft name — a space, a quote, a semicolon — is refused outright rather than escaped and hoped about.
- **The permission is re-checked at dispatch**, not only when the button is drawn.

Available placeholders: `%target%`, `%staff%`, `%ticket%`.

---

## Stopping abuse

```yaml
Reports:
  Cooldown-Seconds: 60
  Notify-Target: false
```

`Cooldown-Seconds` limits how often one player can file. `Notify-Target: false` keeps the reported player from being told — telling a cheater they have been reported gives them time to log off.

Give `oberonstaff.report.blocked` to anybody who has abused the system; it is a negative node and refuses them outright.

---

## Commands and permissions

| Command | Permission | What it does |
|---|---|---|
| `/report <player>` | `oberonstaff.report.use` | File a report |
| `/reports` | `oberonstaff.report.admin` | The report queue |
| `/oberonstaff-flag` | *console only* | The anticheat bridge |

| Node | Default | Grants |
|---|---|---|
| `oberonstaff.report.staff` | op | Everything below |
| `oberonstaff.report.admin` | op | Open the report queue |
| `oberonstaff.report.punish` | op | Use the punish button |
| `oberonstaff.report.use` | true | File reports |
| `oberonstaff.report.blocked` | — | *Negative.* May not report anybody |

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/) — the wizard, the queues, ticket chat
- [Notifications](/plugins/oberonstaff/features/notifications/) — who is told when a report is filed
- [config.yml](/plugins/oberonstaff/configuration/config/) — every setting on this page
