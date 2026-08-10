---
title: "The Word Filter"
description: "How normalisation, the four match modes and the whitelist fit together — and how to pick the right mode so the filter catches bypasses without flagging innocent words."
---

This is the part that stops players working around the filter. It is worth understanding, because every false positive and every miss comes down to two settings.

## Step 1 — normalisation

Before anything is compared, both the message **and the word list** are folded through the same pipeline:

| Step | Turns | Into |
|---|---|---|
| Lower case | `FUCK` | `fuck` |
| Strip accents | `fück`, `ｆｕｃｋ` | `fuck` |
| Map lookalikes | `fuсk` *(Cyrillic с)* | `fuck` |
| Map leetspeak | `5h1t`, `@$$` | `shit`, `ass` |
| Strip separators | `f.u.c.k`, `f-u-c-k` | `fuck` |
| Collapse repeats | `fuuuuuck` | `fuck` |

Each step is switchable in `config.yml` under `Word-Filter.Normalization`. They are all on by default. **The word list is folded the same way**, so both sides always meet in the same place — you never have to write `fuuuck` in `filter.yml`.

> Collapsing repeats means `ass` folds to `as` and `class` folds to `clas`. That is fine, because the rule folds too — but it is why short words need the right match mode.

## Step 2 — matching

Set with `match:` on each entry.

### `WORD` — the default for words of 4+ characters

One word of the message, normalised, contains the rule.

- ✅ catches `fück`, `fuuuck`, `f.u.c.k`, `fucking`
- ❌ never reaches across a space, so it cannot join two innocent words into a rude one

### `CONTAINS` — the aggressive one

The whole message, normalised and with every space removed, contains the rule.

- ✅ catches `f u c k`
- ⚠️ the most likely to catch something innocent — that is what the whitelist is for

Use it for words nobody types by accident. The shipped list uses it for `fuck`, `cunt` and the slurs.

### `LITERAL` — the safe one

Whole word, exactly as typed, case-insensitive. No normalisation at all.

- ✅ never surprises anybody
- ❌ catches no bypasses either

This is the default for short entries, and what to reach for when a rule keeps flagging real words.

### `REGEX` — your own pattern

Matched against the message exactly as typed. The shipped list uses it to spot IP addresses and domain names:

```yaml
  - word: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}(?::[0-9]{1,5})?\\b"
    match: REGEX
    action: NOTIFY
```

A pattern that does not compile is skipped with a console warning — one bad line never takes the list down.

## Which mode do you get if you don't say?

`Word-Filter.Minimum-Contains-Length` decides, default `4`:

- Rule of **4+ characters** → `WORD`
- Rule **shorter** → `LITERAL`

Short stems match inside far too many innocent words. `ass` inside `class`, `pass`, `grass`, `embassy`. Quietly flagging every message containing "class" is the single fastest way to make an owner switch the whole filter off, so the default is to be careful and let you opt into more.

## Step 3 — the whitelist

```yaml
Whitelist:
  - class
  - scunthorpe
  - analysis
```

A whitelisted word is removed from consideration before matching — it cannot *be* a hit, and it cannot *complete* one across a space either. Whitelist entries are normalised the same way, so listing `class` also covers `cl4ss`.

**Whenever the filter flags something innocent, the fix is here.** Add the real word, reload, done.

## When several rules match at once

The harshest action wins: `BLOCK` > `CENSOR` > `WARN` > `NOTIFY`. Ties are broken by weight.

For the violation total, **each rule counts once** however many times it fired. One long message full of the same word cannot inflate somebody into an instant ban.

## Censoring

Only hits from rules whose action is `CENSOR` (or `BLOCK`) get starred out. A `WARN` or `NOTIFY` word is meant to be seen — by the player or by staff — so it is left visible.

A `CONTAINS` hit spread over several words is censored **including the spaces between them**:

```
say f u c k now   →   say ******* now
```

Starring each letter separately would leave the word perfectly readable.
