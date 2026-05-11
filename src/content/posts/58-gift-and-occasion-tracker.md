---
title: "Gift and Occasion Tracker: Never Forget a Birthday Again"
description: "OpenClaw tracks the people in your life, their important dates, gift ideas, budgets, and past presents — so you always know what's coming and what to get."
pubDate: 2026-05-10
category: productivity
tags: ["gifts", "birthdays", "anniversaries", "reminders", "people", "relationships", "planning", "budget", "cron"]
image: "https://images.unsplash.com/photo-1513192977336-5c0ef91a00cd?w=1200&auto=format&fit=crop"
---

![Colorful wrapped presents with ribbons on a light background](https://images.unsplash.com/photo-1513192977336-5c0ef91a00cd?w=1200&auto=format&fit=crop)

You know it's coming. You know you should do something. But somehow it's 11pm on the day before and you're panic-googling "gift ideas for someone who has everything." We've all been there. Not because we don't care — because tracking people, dates, budgets, and gift history across a year is genuinely hard to do consistently.

OpenClaw can be your gift and occasion coordinator. It keeps a file on the people in your life, tracks their important dates, logs gift ideas as they occur to you, monitors your budget, and reminds you well before each occasion so you have real time to plan — not panic at midnight.

## What It Actually Solves

**Date blindness.** You know your sister's birthday is sometime in June. You think. Is it the 12th or the 14th? OpenClaw knows and reminds you a month out, then a week out, then the day before.

**The "what did I get them last year?" problem.** You bought your mom a necklace last Christmas. Did you? You can't remember. OpenClaw has the history.

**Idea evaporation.** You think of the perfect gift for your brother in February. By December you've forgotten it entirely and bought him a gift card. OpenClaw captures ideas when they happen so they're there when you need them.

**Budget surprises.** December hits and suddenly you've spent $800 on gifts you didn't plan for. OpenClaw tracks your budget and warns you before you overspend.

**Last-minute scrambling.** Not having it.

## How It Works

### Set Up Your People File

Create a central file with everyone you track:

```markdown
~/people/contacts.md

## Anna Kim — Sister
- Relationship: Sister, 34
- Birthday: June 14, 1991
- Gift budget: $75
- Notes: Prefers experiences over stuff. Hates clutter.
- Last Christmas: 2025 — Weighted blanket ($65, Uncommon Goods)
- Last birthday: 2025 — Concert tickets to Japanese Breakfast ($85)
- Wishlist: New coffee maker (Breville barista), kitchenAid stand mixer
- Avoid: Scented candles, anything "home decor" she won't use

## James Kim — Dad
- Relationship: Dad, 62
- Anniversary with Mom: September 3, 1984
- Birthday: November 22, 1963
- Gift budget: $100
- Notes: Retired, loves golf and history books.
- Last Christmas: 2025 — Titleist golf balls + "The Guns of August" ($94)
- Interests: WWI history, Oregon golf courses, Scotch whisky
- Avoid: Socks, ties, anything generic

## Priya Sharma — Friend
- Relationship: Close friend since college
- Birthday: March 8, 1990
- Wedding anniversary with Raj: July 21, 2018
- Gift budget: $60 (couple) / $40 (individual)
- Notes: Foodie, loves cooking. Married to Raj.
- Last birthday: 2025 — Spice box set from Etsy ($48)
- Avoid: Anything that'll add to their small apartment clutter

## Marcus Webb — Colleague
- Relationship: Manager, work
- Birthday: August 30, 1985
- Notes: Only do work birthday, keep it minimal ($20 limit).
- Last birthday: 2025 — Book (Atomic Habits) ($18)
- Avoid: Overly personal gifts, anything that could seem weird
```

### Capture Ideas When They Happen

When you think of something, just send it:

> "Add to Anna's wishlist: the OXO Good Grips everything bagel slicer"

> "James mentioned wanting to play Pinehurst No. 2 — maybe golf trip for his birthday?"

> "Priya's into making their own hot sauce now — maybe a chili growing kit?"

OpenClaw files it in the right place. No need to remember it yourself.

### The Reminder System

A weekly cron job checks what's coming up and reminds you:

```json
{
  "schedule": { "kind": "cron", "expr": "0 10 * * 5", "tz": "America/Vancouver" },
  "payload": {
    "kind": "agentTurn",
    "message": "Check ~/people/contacts.md for occasions in the next 30 days. For each, note the date, days away, whether there's a gift idea logged, and whether the budget is tracked. Flag anything with no gift idea and anything overdue for a reminder. Format as a clean summary."
  },
  "delivery": { "mode": "announce" },
  "sessionTarget": "isolated"
}
```

That produces output like:

```
🎁 OCCASIONS — Next 30 Days

📅 June 14 — Anna's Birthday (14 days)
   Budget: $75 | Last: weighted blanket 2025
   Ideas: OXO bagel slicer ✗ (not yet committed)
   Status: 🟡 No final decision made — time to choose

📅 July 5 — Dad's golf trip suggestion (25 days)
   Budget: $100 | Last: Titleist + book 2025
   Ideas: Pinehurst No. 2 round ✗
   Status: 🟢 Time to research — this is a good one

📅 July 21 — Priya & Raj Anniversary (41 days)
   Budget: $60 couple | Last: spice box 2025
   Ideas: chili growing kit ✗
   Status: 🟡 Still early — monitor for better ideas

⚠️ OVERDUE REMINDER
   Mom's birthday was June 1 — did you send the card?
```

### Budget Tracking

OpenClaw can track your overall gift budget for the year:

```markdown
~/people/budget.md

## 2026 Gift Budget
- Allocated: $800
- Spent: $142 (Anna bday 2025-26, Priya wedding anniversary)
- Remaining: $658

## By person (annual)
- Anna: $75 limit | $0 spent this cycle
- Dad: $100 limit | $0 spent
- Mom: $75 limit | $65 spent (early bday card + flowers)
- Priya: $60 limit | $0 spent this cycle
```

Before you buy something, you can ask:

> "What's my remaining gift budget?"

And OpenClaw tells you. This prevents the December shock where you realize you've already spent $1,200 and you thought you had $800.

### Gift History

Every time you give a gift, log it:

> "Got Anna the OXO bagel slicer — $54 on Amazon, used the 20% coupon"

OpenClaw updates her profile. Over time you build a real history:

```
ANNA — Gift History
  2026 Birthday: OXO Good Grips bagel slicer ($54, Amazon)
  2025 Christmas: Weighted blanket ($65, Uncommon Goods)
  2025 Birthday: Japanese Breakfast concert tickets ($85)
  2024 Christmas: Ember temperature-controlled mug ($55, Best Buy)
  2024 Birthday: (no record — add?)
```

This means you never accidentally re-give something. And if she mentions years later "that mug is still going strong," you have the record to prove you remember.

## Why This Works Better Than a Spreadsheet

Spreadsheets work until you forget to open them. OpenClaw comes to you. Every Friday morning you get a clean summary of what's coming and what you still need to do. Ideas get captured without you having to remember them. Budget stays visible without you having to manually update a cell.

The friction is low. When you think of something, you send a message. When a reminder comes, you act on it. The system handles the tracking so your brain doesn't have to.

## What You Need to Set It Up

- **OpenClaw** on Telegram or Discord
- **A `~/people/` directory** with a contacts file and a budget file
- **A weekly reminder cron** (Friday morning works well — gives you the weekend to shop if needed)
- **A log-after-gift habit** — takes 10 seconds and compounds into a useful history

## Limitations

**No automatic date discovery.** OpenClaw can't find birthdays on its own — you enter them. The data is only as good as what you put in.

**Ideas don't generate themselves.** OpenClaw captures what you tell it. If you're bad at sending "remind me of this idea," you still won't have ideas when you need them. The value comes from actually using it.

**Not an online gift search engine.** OpenClaw doesn't browse Amazon or find the best prices. It helps you remember and plan — shopping is still on you.

**Doesn't automate shipping.** You still have to buy and send the gift. OpenClaw just makes sure you know it's coming and have a plan.

## The Real Value

The real value isn't the reminder — it's the record. When you have five years of gift history, you know what actually worked. You know your dad always says "just put it on my card" but actually really loves the history books. You know your sister ignores anything she can't use or don't and that experience gifts are always the hit. You know what you've already tried so you don't waste money on things that landed flat.

OpenClaw makes that record easy to keep. A message after the occasion, not a form to fill out in the moment. Capture ideas when they hit, log gifts when they're given, get nudged when the date is coming. A system that's simple enough to actually use, week after week.

Set it up once. Keep the record. Stop panic-gifting.