---
title: "Your Loyalty Points Maximizer: Stop Letting Airline Miles and Credit Card Rewards Expire"
description: "OpenClaw tracks every loyalty program you belong to — airline miles, hotel points, credit card rewards, grocery/drugstore programs — alerts you before points expire, surfaces transfer bonuses, and tells you which redemption gives the best value per point."
pubDate: 2026-08-08
category: productivity
tags: ["loyalty", "rewards", "miles", "points", "credit-cards", "travel", "personal-finance", "maximizer", "expiration"]
image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&auto=format&fit=crop"
---

![Airplane wing at sunset above the clouds](https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&auto=format&fit=crop)

You've got 47,000 AAdvantage miles, 18,000 United MileagePlus, 12,000 Marriott Bonvoy, 6,500 Chase Ultimate Rewards, 2,300 Air Canada Aeroplan, and a $14 credit sitting in a grocery store account you forgot about. Several of those balances are quietly approaching expiration. One of them is going to lapse in November. You have no idea which one.

You're also vaguely aware that you could transfer Chase points to Hyatt 1:1, or that Aeroplan currently has a 30% transfer bonus from Amex, but you never quite remember the details when you're actually booking a flight. So you spend the points on something mediocre instead of something great.

This is the silent tax on people with multiple credit cards and loyalty accounts. The points are valuable — but only if you use them strategically, before they expire, and with awareness of the current transfer landscape. Without a system, you leak value.

OpenClaw can be your loyalty concierge.

## What This Solves

**Silent expiration.** Most loyalty programs have inactivity clocks — typically 12 to 24 months. If you don't have an account somewhere (earn or burn) for that long, the points expire. Marriott warns 90 days before. Aeroplan warns 60 days. Most other programs are silent. OpenClaw watches all of them and warns you.

**Lost awareness of transfer bonuses.** Airline and bank programs regularly run 20-50% transfer bonuses from one currency to another. These are usually time-limited (a few weeks to a few months). Without a place to track them, you miss them entirely.

**Wrong redemption choices.** Spreading 60,000 Ultimate Rewards across three mediocre uses gets you one bad flight. Transferring them during a 30% bonus to an airline you were going to book anyway gets you a great flight. Knowing the difference is the entire game.

**Orphaned small balances.** That $14 in a defunct drugstore program, the 1,200 miles in an airline you haven't flown in eight years, the 800 points in a hotel chain that doesn't exist in your destinations anymore. These are tiny individually but they distract from the real balances.

**Forgotten "use it or lose it" annual fee credits.** Many travel cards come with $200-$400 in annual credits (Uber, hotel, airline, dining). If you don't use them by the cycle date, they vanish. OpenClaw tracks the deadlines and reminds you to spend on the right categories.

## How It Works

### 1. The Programs File

You maintain a single YAML file with every loyalty program you're in:

```yaml
# ~/rewards/programs.yaml
programs:
  - name: "United MileagePlus"
    type: airline
    account_number: "**********4521"
    balance: 18420
    expiration_policy: "18 months of inactivity"
    last_activity: 2025-09-14
    expires_if_inactive_by: 2027-03-14
    transfer_partners: ["Chase UR", "Amex MR", "Capital One", "Bilt"]
    points_value_cpp: 1.2  # cents per point baseline estimate
    notes: "Premier Gold status, expires Feb 2027"

  - name: "Marriott Bonvoy"
    type: hotel
    account_number: "**********8809"
    balance: 42300
    expiration_policy: "24 months inactive"
    last_activity: 2026-02-01
    expires_if_inactive_by: 2028-02-01
    transfer_partners: ["Amex MR", "Chase UR"]
    points_value_cpp: 0.7
    notes: "Titanium status"

  - name: "Chase Sapphire Reserve"
    type: credit_card
    account_number: "****4421"
    balance: 12450
    annual_fee: 550
    fee_credits_remaining: 300  # $300 travel credit, $200 must use by Dec
    fee_credits_deadline: 2026-12-31
    transfer_partners: ["United", "Hyatt", "Marriott", "Southwest", "British Airways"]
    notes: "Currently 30% transfer bonus to British Airways through Aug 31"

  - name: "Amex Membership Rewards"
    type: credit_card
    balance: 67200
    annual_fee: 695
    transfer_partners: ["Delta", "Aeroplan", "Marriott", "Hilton", "British Airways", "ANA"]
    notes: "Aeroplan transfer bonus running 30% through Aug 18"

  - name: "Safeway/Albertsons"
    type: grocery
    balance: 14.27  # dollars
    expiration_policy: "excluded if you earn at least 1 point in 90 days"
    points_value_cpp: 100  # treat as 100 cpp since it's dollars
    notes: "Garbage balance but technically money"
```

This becomes the canonical source. The Schemas are simple — you can add or remove programs as you go.

### 2. Weekly Status Check

A cron job runs every Monday to:

```yaml
# Cron: Monday at 9am
# 1. Check each program's expiration status
# 2. Identify any active transfer bonuses in your network
# 3. Flag programs with balances worth consolidating
# 4. Remind of upcoming fee credit deadlines
```

Your Monday morning message:

> **📊 Loyalty & Rewards — Week of Aug 10**
>
> **Expiration watch (next 90 days):**
> - None critical. Smallest inactivity window: United MileagePlus, last activity Sep 2025, expires Mar 2027.
> - Safeway dollars: last earn Apr 2026, will expire mid-October if no activity.
>
> **Active transfer bonuses (next 14 days):**
> - Amex → Aeroplan: 30% bonus through **Aug 18** (10 days)
> - Chase → British Airways: 30% bonus through **Aug 31** (24 days)
>
> **Fee credit deadlines:**
> - Chase Sapphire Reserve: $300 travel credit remaining, $200 of it must be used by **Dec 31** to reset
>
> **Recommended action:**
> - If you have upcoming travel plans for fall/winter, decide whether to transfer Amex → Aeroplan or Chase → BA before the bonuses expire. With a 30% bonus, 50,000 MR = 65,000 Aeroplan (vs. 50,000 base).
> - Spend $14 at Safeway before Aug 31 to keep the dollar balance alive.

### 3. Expiration Alerts

Sometimes the schedules aren't quite predictable. OpenClaw sends a heads-up 60 days before predicted expiration:

> **⚠️ Expiration Alert — Aer Lingus AerClub**
> Your current balance: 4,200 Avios (~$60 value)
> Predicted expiration: **Oct 26, 2026** (62 days)
> Action required: Any activity (even a $5 partner purchase) resets the clock.
>
> Do you want to (a) log a small qualifying activity, (b) burn the points before they expire, or (c) accept the loss?

The "any" qualifier is important — most people don't actually care about 4,200 Avios enough to log activity. Seeing the alert lets them decide.

### 4. Redemption Value Analysis

When you're about to book a flight or hotel, OpenClaw can help you figure out the best use of points:

> "I'm looking at a flight to Berlin in October. Should I use points or cash?"

OpenClaw checks current transfer partner values, compares them to the cash price, and tells you:

> **Berlin flight — Oct 12-19, $642 cash**
>
> **Point options:**
> - Chase UR → United: 53,500 miles (1.2 cpp value). Flight on Star Alliance.
> - Chase UR → BA Avios (30% bonus ends Aug 31): 41,200 + 12,360 = 53,560 Avios, but BA doesn't fly direct to Berlin. Likely routing via London.
> - Amex MR → Aeroplan (30% bonus ends Aug 18): 41,750 + 12,525 = 54,275 Aeroplan. Aeroplan has direct Star Alliance to Berlin.
> - Cash: $642
>
> **Recommendation:** Use Aeroplan transfer this week to lock in the 30% bonus. 54,275 Aeroplan at 1.4 cpp partner value ≈ $760 of flight, better than cash. If you don't have plans to use Aeroplan before Aug 18, wait on the bonus — regular transfer value is similar.

This is genuinely useful. The 30% bonus might be the difference between a "good" redemption and a "great" one.

### 5. Annual Fee Credit Tracking

Premium cards have multiple fee credits with different cycles. OpenClaw tracks them:

```yaml
# Cards with annual credits
- card: "Chase Sapphire Reserve"
  fee: 550
  credits:
    - name: "Travel credit"
      value: 300
      reset: "Anniversary date, Nov 6"
      used: 0
    - name: "DoorDash"
      value: 300
      reset: "Calendar year, Dec 31"
      used: 180
      remaining: 120
```

You get a periodic nudge:

> "**Chase Sapphire Reserve credits** — Quarter 3
> - Travel credit: $300 unused, resets Nov 6 (65 days)
> - DoorDash: $120 remaining, expires Dec 31 (120 days)
>
> Action: Book a hotel or flight before Nov 6 to use the full $300 travel credit. Otherwise it expires."

For people who pay $550+ annual fees, this is the difference between a card paying for itself and a card costing you money.

## What You Need to Set It Up

- **OpenClaw** with Telegram or your preferred channel
- **A single YAML file** listing all your programs (start with the top 5 — you can add more as you go)
- **Your current balances** — takes 30 minutes to log everything the first time
- **A weekly cron job** — typically Monday morning
- **Optional:** A list of upcoming trips or plans so OpenClaw can model future use

That's it. No broker platform, no spreadsheet template, no manual lookup. The system updates whenever you log a transaction or balance change.

## Limitations

**OpenClaw doesn't pull real-time balances.** It tracks what you tell it. After every transaction or balance change, log it. If you stop logging, the system goes stale.

**Transfer bonuses are time-sensitive.** OpenClaw can remind you of bonuses you log into the file, but it doesn't automatically scrape "The Points Guy" or"Seat 31A" daily. Subscribe to those newsletters and add the bonuses to your file when they appear.

**Cents-per-point valuations are estimates.** OpenClaw's value-per-point calculations are based on typical redemption values (flights, hotels, cash). Your actual value depends on what you redeem for. The system biases toward conservative estimates.

**Spousal accounts complicate this.** If you and a partner pool points, you need a shared file. Easy to set up, but worth mentioning.

**The system is only as good as your logging.** Most point leaks come from accounts you forgot about. List every program you have, even if you think you'll never use it. The value of ignoring a $50 balance is small; the value of knowing it's about to expire is high.

## The Bigger Picture

Loyalty programs are designed to be forgettable. They want you to earn slowly, lose track, and let balances expire. The math is intentionally fuzzy — points aren't dollars, so it's hard to feel them leaking.

OpenClaw makes them concrete. You see balances, expirations, transfer rates, and credit deadlines. You get nudged before things expire. You know when a 30% transfer bonus is running and whether it makes sense for your plans. Over time, you stop treating points as a passive afterthought and start treating them as a real financial asset — one that quietly compounds if you pay attention.

Start with the three programs you actually use. Then add the ones with the most valuable points. After a few months, you'll find you're redeeming points more often, in better ways, and never losing sleep over an expiration.

The first time you transfer during a bonus and book a flight that would have cost $800, you realize this kind of paying-attention has a real dollar return.
