---
title: "Automated Password Rotation Manager"
description: "OpenClaw tracks when you last changed critical account passwords, sends timed reminders before they become stale, and helps you execute rotations without re-using credentials across sites."
pubDate: 2026-05-28
category: security
tags: ["passwords", "security", "credentials", "rotation", "automation", "cron", "telegram", "account-safety"]
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop"
---

![A padlock on a computer keyboard representing password security](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop)

You have passwords for over 100 accounts. You know you should rotate the critical ones — banking, email, primary social accounts — but you don't have a system. You change them when you remember, or when a service tells you something went wrong, or never. Password managers solved the storage problem but not the rotation problem.

OpenClaw can be your password rotation manager. It tracks when you last changed your critical passwords, sends reminders on a schedule, helps you generate new secure passwords, and maintains a history so you never accidentally reuse a credential that was just retired.

## The Problem With Password Rotation

Most security advice says "change your passwords regularly." Most people don't, because there's no feedback loop. You change your banking password today and it's fine for three years — until a breach at that institution exposes your credential and you have no idea it happened. Password managers store passwords but don't nag you to change them. Email breach trackers like HaveIBeenPwned tell you after the fact. There's nothing that says "it's been 90 days since you changed your admin password, time to rotate it."

The other problem is reuse. When you do rotate a password, you might use a variation of an old one or reuse a credential from another account. If that old credential was already compromised, the rotation didn't actually help.

OpenClaw enforces a rotation discipline without being annoying about it.

## How It Works

### Set Up Your Credential Registry

Create a structured file OpenClaw can read and update:

```yaml
~/credentials/rotation-log.md

# Format: account, last rotated, interval, notes

accounts:
  - name: "Gmail (primary)"
    url: "https://accounts.google.com"
    last_rotated: "2026-02-15"
    interval_days: 90
    priority: critical
    notes: "2FA enabled, backup codes stored in 1Password"

  - name: "AWS Root Account"
    url: "https://aws.amazon.com"
    last_rotated: "2026-01-08"
    interval_days: 60
    priority: critical
    notes: "MFA on separate device, access key last rotated separately"

  - name: "GitHub"
    url: "https://github.com"
    last_rotated: "2026-03-20"
    interval_days: 90
    priority: high
    notes: "SSH keys also rotated at same time"

  - name: "Twitter/X"
    url: "https://twitter.com"
    last_rotated: "2026-04-01"
    interval_days: 180
    priority: medium
    notes: "Uses app-specific password for integrations"

  - name: "Home Router"
    url: "http://192.168.1.1"
    last_rotated: "2025-12-01"
    interval_days: 180
    priority: critical
    notes: "Default admin changed, WiFi password rotated separately"
```

The `priority` field determines how urgent the reminder is. `critical` gets 14-day and 7-day warnings. `high` gets one at 7 days. `medium` gets one at 7 days with a note to evaluate.

### The Rotation Reminder

When an account is approaching its rotation date, OpenClaw sends a Telegram message:

> "🔐 GitHub password is due for rotation in 7 days (last changed Mar 20). Current interval: 90 days. Want me to generate a new secure password?"

If you say yes, OpenClaw generates a strong random password using your configured rules (length, character types, no ambiguous characters) and presents it:

> "Generated password for GitHub:
> `xK9#mP2$vL7@nQ4!wY3`
> 
> Copy it — I won't store it in plain text. After you change it in your browser, add it to your password manager. I'll log the rotation date when you confirm the change was successful."

You confirm when it's done:

> "GitHub password rotated, confirmed."

OpenClaw updates the `last_rotated` date in the registry, archives the rotation event, and resets the countdown.

### Password Generation

OpenClaw generates passwords using cryptographically random entropy:

```
Generated: 20 characters, no ambiguous chars
Format: uppercase + lowercase + digits + symbols
xK9#mP2$vL7@nQ4!wY3
Entropy estimate: ~128 bits

Exclude: 0, O, l, 1, I — avoids confusion when reading back
```

The generation rules are configurable per account — some services have stupid restrictions ("no special characters," "max 16 chars"). OpenClaw can adapt:

> "Your bank only allows alphanumeric passwords, max 12 chars. Generating compatible password: `aB3kLm9xY2Qr`"

### Rotation History and Reuse Prevention

Every rotation event is logged, not just the current state:

```markdown
## Rotation History: GitHub

| Date       | Action       | Notes |
|------------|--------------|-------|
| 2026-05-28 | Rotated      | New password set, confirmed |
| 2026-02-15 | Rotated      | Old password retired |
| 2025-11-18 | Rotated      | From initial setup |

## Recently Retired (last 90 days)
- xK9#mP2$vL7@nQ4!wY3 → retired 2026-05-28 (do NOT reuse)
- aB3kLm9xY2Qr → retired 2026-02-15
- T8#vN2$mK5&pL9!wQ1 → retired 2025-11-18
```

When OpenClaw generates a new password, it checks the history. If you ask it to generate a password and it matches something retired in the last 90 days, it flags it:

> "⚠️ That pattern matches a credential retired on Feb 15, 2026. Reusing old credentials is a security risk — I'll generate something different. New password: `rT7#nK2$mB5&pX9!wQ4`"

This prevents the common failure mode where people rotate passwords and accidentally cycle back to one that was already compromised.

### Breach Integration

OpenClaw can check your registered email addresses against HaveIBeenPwned on a schedule. If a breach is detected for an account in your registry:

> "🚨 BREACH ALERT — Adobe Creative Cloud
> 
> Your email was found in the Adobe breach (May 2026). If you have an Adobe account, rotate your password immediately — especially if you reused it elsewhere.
> 
> You last rotated Adobe: 2025-08-12 (over 270 days ago).
> Generating a new password now — use it immediately."

When a breach fires, OpenClaw also prompts you to check for reuse: "Did you use this password anywhere else?" and flags any other accounts with the same credential so you can rotate them too.

## What You Need

- **OpenClaw** with file read/write access and Telegram (or your preferred channel)
- **A credentials directory** — `~/credentials/rotation-log.md` and optionally encrypted storage for sensitive notes
- **A password manager** — OpenClaw doesn't replace 1Password, Bitwarden, or your OS keychain; it coordinates rotation timing but the actual credential storage stays in your password manager
- **Optional: HIBP API key** — for breach checking; free tier available at haveibeenpwned.com/API/Key

## Setting Up the Cron

```yaml
{
  "name": "password-rotation-check",
  "schedule": { "kind": "cron", "expr": "0 10 * * *" },
  "payload": {
    "kind": "agentTurn",
    "message": "Read ~/credentials/rotation-log.md and check every account against its rotation schedule. For any account within 14 days of its rotation date, send a Telegram reminder with the account name, last rotated date, interval, and a prompt to rotate. For accounts already past their rotation date, send an urgent reminder. Generate a new secure password if requested.",
    "timeoutSeconds": 120
  },
  "delivery": { "mode": "announce", "channel": "telegram" },
  "sessionTarget": "isolated"
}
```

Daily checks mean you get at least 2 reminders before an account goes overdue. If you want less noise, switch to every 3 days and use a 7-day threshold.

## Limitations

**OpenClaw doesn't store passwords** — it generates them on demand and discards them. This is intentional. You add the generated password to your password manager yourself. OpenClaw only tracks rotation dates and history, not the credentials themselves.

**No browser automation** — OpenClaw can't fill in forms or navigate to password change pages. It gives you the new password and the correct URL. You do the actual rotation.

**Depends on honest updates** — if you rotate a password without telling OpenClaw, it doesn't know. The system only works if you confirm rotations when they happen. Building the habit is the hard part.

**Breach detection requires email exposure** — HIBP only knows about breaches that include your email. If your email wasn't in a breach but your password was in a credential stuffing list, OpenClaw won't catch it.

**Not a replacement for a password manager** — this coordinates rotation, it doesn't replace storage. Use 1Password, Bitwarden, or your OS keychain for actual credential storage.

## Why This Works

The password rotation problem isn't about knowledge — everyone knows they should rotate. It's about friction and forgetting. You need a system that reminds you on a schedule, generates the new credential so you don't have to think about it, and prevents you from accidentally reusing something you just retired.

OpenClaw provides the timing and the generation. You provide the action. The reminder comes before the risk materializes, not after.

The goal: every critical account has a rotation date and you know what it is. When the reminder fires, you rotate. Everything else is handled.