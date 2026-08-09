---
title: "Email Verification"
description: "Confirms that a linked account actually owns the email address on its profile — the prerequisite for password resets, purchase receipts and any mail your…"
---

Confirms that a linked account actually owns the email address on its profile — the prerequisite for password resets, purchase receipts and any mail your site sends.

---

## How it works

1. The player opens their profile on the website and requests a verification code.
2. The API mails the code to the address on file.
3. In game:

```
/verifyemail <code>
```

4. The plugin forwards the code with the player's UUID; the API confirms or rejects it.

Note the direction: the code is requested **on the web**, not in game. There is no `/verifyemail request`. This keeps the address itself out of Minecraft chat entirely — the plugin never sees an email address.

---

## Outcomes

| Result | Message |
|---|---|
| Correct | success |
| Wrong | *"Wrong email code. %attempts% attempt(s) left."* |
| Too many wrong | *"Too many attempts. Request a new code from your profile in about %minutes% min."* |
| Expired | *"That email code expired. Request a new one from your website profile."* |
| Nothing pending | *"No pending email code was found for your Minecraft account. Request one from your profile first."* |
| Address taken | *"That email is already verified by another player on this server."* |

## One email, one account

The API enforces uniqueness per server. A player cannot verify an address that another account already holds — which is what makes "verified email" usable as an anti-alt signal.

## Permission

`dweblink.verifyemail` — default **true**.

## Next

- [Discord Linking](/plugins/dweblink/features/discord-linking/)
