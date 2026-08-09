---
title: "Website Login"
description: "The core feature: proving that the person holding a website session is the person holding a Minecraft account, without either side ever handling a password."
---

The core feature: proving that the person holding a website session is the person holding a Minecraft account, without either side ever handling a password.

---

## How it works

1. On the website the visitor types their Minecraft nickname and starts a login.
2. The API generates a short code bound to that nickname and shows it on screen.
3. In game the player runs:

```
/verify <code>
```

4. The plugin sends the code plus the player's UUID to the API.
5. The API decides. The plugin only relays the verdict.

The plugin never sees or stores a password, an email or a session token. It stores nothing at all — there is no local database.

---

## Outcomes

| Result | Message the player sees |
|---|---|
| Correct | success message, accounts linked |
| Wrong | *"Wrong code. %attempts% attempt(s) left, then you're locked out for a while."* |
| Too many wrong | *"Too many attempts. Try again in about %minutes% min."* |
| Code expired | *"That code expired. Enter your nickname on the website again for a new one."* |
| API unreachable | *"Couldn't verify right now. Please try again shortly."* |
| Not configured | *"Website linking isn't configured on this server yet."* |

Attempt counting and lockout live **on the API**, not in the plugin. Restarting the Minecraft server does not reset a lockout, and a player cannot dodge it by switching servers on a network.

## While the request is in flight

The player immediately gets *"Checking your code…"*, then the result. The call is asynchronous — a slow website delays that one player's reply and nothing else.

## After a successful verify

A successful `/verify` also triggers a profile push, so the website has the player's current username and rank straight away rather than waiting for their next join. See [Profile & Rank Sync](/plugins/dweblink/features/profile-sync/).

## Permission

`dweblink.verify` — default **true**. Set it to false for a group if you want to restrict linking, but bear in mind that removes their only route onto the site.

## Next

- [Email Verification](/plugins/dweblink/features/email-verification/)
