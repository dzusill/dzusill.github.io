---
title: "filter.yml"
description: "The word list and the whitelist — both entry forms, every field, and what the shipped list already covers."
---

`plugins/OberonChat/filter.yml`. This is the file you will actually edit. Reload with `/oberonchat reload`.

> Nothing in this file is ever merged back from the defaults. A word you delete stays deleted, and the shipped list is a starting point rather than a fixture.

## Two entry forms

Short, for the majority:

```yaml
Words:
  - muppet
  - numpty
```

Uses `Default-Action` and `Default-Weight` from `config.yml`, and picks the match mode by length.

Long, when you want control:

```yaml
Words:
  - word: muppet
    action: CENSOR
    match: CONTAINS
    weight: 3
```

Mix both in the same list.

## Fields

| Field | Values | Default |
|---|---|---|
| `word` | the text, or a regular expression when `match: REGEX` | — |
| `action` | `BLOCK` `CENSOR` `WARN` `NOTIFY` | `Word-Filter.Default-Action` |
| `match` | `WORD` `CONTAINS` `LITERAL` `REGEX` | by length — see below |
| `weight` | violation points | `Word-Filter.Default-Weight` |

### `action`

| | Message | Player told | Staff alerted |
|---|---|---|---|
| `BLOCK` | never sent | yes | yes |
| `CENSOR` | sent with `****` | yes | yes |
| `WARN` | sent as typed | yes | no |
| `NOTIFY` | sent as typed | **no** | yes |

### `match`

| | Compares | Catches | Risk |
|---|---|---|---|
| `WORD` | one word, normalised | `fück` `fuuuck` `f.u.c.k` `fucking` | low — never crosses a space |
| `CONTAINS` | whole message, spaces removed | `f u c k` | higher — this is what the whitelist is for |
| `LITERAL` | whole word, exactly as typed | only the literal word | none |
| `REGEX` | your own pattern | whatever you write | yours |

Without `match`, an entry of at least `Minimum-Contains-Length` characters gets `WORD`; anything shorter gets `LITERAL`. Details on [The Word Filter](/plugins/oberonchat/features/word-filter/).

## Whitelist

```yaml
Whitelist:
  - class
  - assassin
  - scunthorpe
```

Words that are never a hit, however they are spelled. **This is the fix for every false positive.**

A whitelisted word cannot *be* a hit and cannot *complete* one across a space either. Entries are normalised the same way as everything else, so `class` also covers `cl4ss`.

## What ships

The default list is deliberately modest — it is a starting point you are expected to extend for your community.

**Everything blocks.** If a player types one of these words the message is never sent, rather than being starred out.
That is the posture this server asked for.

| Group | Action | Notes |
|---|---|---|
| General profanity | `BLOCK` | `fuck` `shit` `bitch` `cunt` and similar |
| Short stems | `BLOCK`, `LITERAL` | `ass` `tits` — whole-word only, or they fire inside normal words |
| Insults | `BLOCK`, weight `0` | `idiot` `moron` — blocked and alerted, but never counts towards a punishment |
| Slurs | `BLOCK`, weight `5` | Weighted so two of them reach a second threshold, if you enable punishment |
| Advertising | `NOTIFY`, regex | IP addresses and domain names — the message goes through, staff are told, the player is not |

`CENSOR` and `WARN` are still available per word if you ever want a softer touch on something mild.

The one deliberate exception is advertising: `NOTIFY` rather than `BLOCK`, so somebody advertising does not learn
what tripped the filter and start working around it.

The whitelist ships with the usual Scunthorpe suspects: `class`, `grass`, `assassin`, `analysis`, `cocktail`, `hancock`, `dickens`, `document`.

## Regex entries

Matched against the message exactly as typed. YAML needs the backslashes doubled:

```yaml
  - word: "\\bdiscord\\.gg/\\w+"
    match: REGEX
    action: BLOCK
    weight: 2
```

A pattern that does not compile is skipped with a console warning:

```
[OberonChat] Skipping unusable filter entry: {word=([unclosed, match=REGEX}
```

One bad line never takes the list with it.

## Testing a change

```
/oberonchat check <text>
```

Runs the live filter over a phrase and reports the rule that fired, what would happen, the violation weight and the resulting text. No second account, no swearing in public chat.
