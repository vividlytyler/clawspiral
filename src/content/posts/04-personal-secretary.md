---
title: "Your Personal Secretary: Email, Calendar, and Reminders"
description: "How OpenClaw can act as a persistent, memory-aware assistant for managing email, calendar events, and contextual reminders — without subscribing to another SaaS."
pubDate: 2026-03-26
category: lifestyle-wellness
tags: ["email", "calendar", "reminders", "productivity", "memory", "ical", "imap", "telegram", "follow-up", "workflow", "cron", "telegram-commands", "control-interface"]
image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop"
---

The promise of an AI assistant has always been: "handle the administrative overhead so I can focus on actual work." OpenClaw, with file system access and API integrations, can do this credibly for email, calendar, and reminders — running 24/7 without subscription fees or data sharing.

## Email Management

IMAP access lets OpenClaw:
- **Scan for urgent messages** — flag emails from specific senders or with priority markers
- **Draft responses** — based on context from previous emails in the thread
- **Summarize threads** — extract the key decisions or action items from long email chains
- **Monitor filters** — alert you when emails matching certain criteria arrive

### Example Workflow

The heartbeat system handles the timing. A typical setup looks like:

1. **Heartbeat** fires every 30 minutes
2. **OpenClaw** runs an IMAP search: `FROM "manager" OR SUBJECT "URGENT" UNSEEN`
3. **Conditional routing** — matching emails trigger a Telegram message; no matches, no message

### Conditional Alert Rules

The IMAP search criteria can be as specific as you need. Real filter rules:

| Rule | IMAP Search |
|------|-------------|
| Boss or executive | `FROM "ceo@company.com" OR FROM "cto@company.com"` |
| Urgent by header | `OR FROM "boss" SUBJECT "urgent" UNSEEN` |
| Large attachments | `SUBJECT "receipt" OR SUBJECT "invoice" LARGER 1000000` |
| Vendor contracts | `FROM "@lawfirm.com" OR (SUBJECT "agreement" SUBJECT "signature")` |
| Travel confirmations | `FROM "airline" OR FROM "booking@" OR SUBJECT "itinerary"` |

The heartbeat runs the appropriate search based on time of day — work hours use the full executive/vendor filter, evenings filter for anything flagged urgent. You can configure as many rules as you want, each with its own Telegram template.

A real Telegram alert looks like:

> **📬 Urgent email from: Sarah Chen**
> *Re: Q2 budget review — action needed*
>
> Hi Tyler, just circling back on the budget numbers. We need your sign-off before EOD Friday or the Q2 forecast gets delayed. Let me know if you want to hop on a quick call...

That's 200 characters of context, enough to decide whether to drop what you're doing.

### Automated Email Processing

Beyond passive monitoring, OpenClaw can actively process email threads. A realistic scenario:

**The situation:** A vendor (Widget Corp) sends an invoice, you forward it to OpenClaw, and it:
1. Parses line items using a prompt template
2. Cross-references with an `approved-vendors.json` memory file
3. Checks for overdue invoices in a local `accounts-receivable.md`
4. Routes accordingly — flags for approval if over $2,000, auto-archives if approved

```
Subject: Invoice #4892 - Widget Corp
From: billing@widgetcorp.example

OpenClaw extracts:
  Vendor: Widget Corp
  Amount: $1,847.00
  Due: 2026-04-15
  Line items: 3x server racks, 1x UPS backup

Approved vendor? ✓ (from approved-vendors.json)
Overdue balance? None
Amount under $2,000 threshold → Auto-archived to paid/ folder.
Telegram sent: "Invoice #4892 from Widget Corp auto-archived ($1,847)."
```

This requires no browser, no SaaS subscription, and the routing rules live in plain text files you can edit directly.

### Drafting Emails Without SMTP

OpenClaw can't send outbound email natively, but it can draft them — and you have options for delivery:

**Option 1: Telegram delivery.** OpenClaw writes the full email (To, Subject, Body) and sends it via Telegram. You copy-paste into your email client. Works for low-volume, high-stakes emails (contract negotiations, delicate responses).

**Option 2: Save to draft folder via IMAP.** If your mail server supports IMAP write-back, OpenClaw can APPEND to your Sent or Drafts folder — effectively writing emails that appear in your drafts folder for you to review and send.

**Option 3: CC/BCC forwarding.** Set up a rule where OpenClaw sends to itself via an external service (Mailgun, SendGrid), then your email client picks it up via filtering.

The drafting quality is where OpenClaw shines. Given a thread context and a goal ("write a reply declining the proposal but keep the door open"), it produces coherent, context-aware responses. The delivery mechanism is the solvable part.

### Limitations

OpenClaw doesn't have native email sending (SMTP) — it can read via IMAP but outbound requires integration with a mail service or Telegram forwarding.

## Calendar Management

Calendar files (`.ics`) are plain text and easy to parse. OpenClaw can:
- **Read upcoming events** — extract tomorrow's meetings, flag scheduling conflicts
- **Summarize the day** — provide a morning brief of what's coming
- **Track availability** — help coordinate meeting times across time zones
- **Prepare for meetings** — pull relevant context before you walk in

### Reading a Calendar File

A parsed `.ics` event looks like this when OpenClaw reads it:

```
BEGIN:VEVENT
DTSTART:20260415T140000Z
DTEND:20260415T143000Z
SUMMARY:Q2 Budget Review
DESCRIPTION:Attendees: Sarah Chen\, Jordan Lee\, Tyler
LOCATION:Zoom — https://zoom.us/j/928174
END:VEVENT
```

OpenClaw extracts the relevant fields (time, title, attendees, location) and formats them for the morning brief. For all-day events or multi-day conferences, it surfaces those separately so they don't clutter the day's schedule.

### Calendar Refresh Cycle

The `.ics` file is a snapshot — it doesn't update automatically unless your calendar app supports it. A few approaches:

**Automatic refresh (Fastmail, Zoho):** Some providers give you a URL that exports a live `.ics`. Set a cron job to re-fetch it every hour:
```bash
curl -s "https://mail.fastmail.com/user/calendar.ics" -o "$HOME/calendar/work.ics"
```

**Manual export (Google, Apple):** Download and replace the file when you know something changed — new events, cancelled meetings. Or set a weekly reminder to re-export.

**Calendar check:** If you're adding events via a different tool and want OpenClaw to notice, a daily heartbeat at an odd hour (after you'd normally add events) is a reasonable sync point.

### Conflict Detection

When two events overlap, OpenClaw flags it:

```
⚠️ Conflict detected: "Q2 Budget Review" (2:00–2:30 PM) overlaps with
"Deep Work Block" (1:00–3:00 PM). Suggest moving the block to start at 3:30 PM.
```

This is especially useful if you maintain a personal `.ics` alongside a work one — OpenClaw can read both and catch cross-calendar conflicts before you're double-booked.

### Time Zone Coordination

When you're scheduling across time zones, OpenClaw can do the arithmetic for you. Working with someone in Berlin while you're in Vancouver is a 9-hour gap — easy to miscount, especially across DST transitions.

OpenClaw can answer questions like:
- "What time is 3 PM in Berlin right now?"
- "Find a 1-hour window that works for 9 AM Vancouver, 5 PM London, and 10 AM New York"
- "Show me the next week of overlapping work hours between PDT and CET"

This comes up more than you'd think when coordinating distributed teams or international clients. The math is trivial but the DST edge cases aren't — OpenClaw handles the conversion cleanly so you don't show up to a call at 7 AM your time when it was supposed to be 7 PM.

### Meeting Preparation

Before a meeting, OpenClaw can pull context from your memory files so you're not walking in cold:

```
Upcoming: Q2 Budget Review in 30 minutes (Sarah Chen, Jordan Lee)

📋 Previous context from memory:
- Last discussed: Q1 variance was +$4,200 under budget (2026-03-18)
- Action item open: Tyler to present revised Q2 forecast
- Sarah mentioned wanting to discuss headcount additions

🔗 Last email in thread:
"Sarah: Looking forward to your revised numbers. The board is
specifically asking about the software line — can you address that?"
```

OpenClaw scans your `memory/` directory for any sessions mentioning the meeting title or attendees, and appends the last relevant email snippet. It won't have everything — but even one relevant note from two weeks ago is better than nothing.

This requires no CRM. It works from plain text files and your email thread history.

![Meeting preparation — a laptop on a desk with notes and a coffee, representing context gathering before a meeting](https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80)

### Morning Brief Integration

The classic use case: before your day starts, OpenClaw sends a Telegram message with:
- Today's weather
- Upcoming calendar events
- Any urgent emails
- Notes from yesterday's tasks

This is straightforward to build with:
1. `curl wttr.in/{city}?format=j1` for weather
2. Parse local `.ics` file for calendar
3. IMAP query for recent emails
4. Format and send via Telegram

![Morning brief pipeline — weather, calendar, email, and memory feeding into a single Telegram message](https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=1200&auto=format&fit=crop&q=80)

## Telegram as a Control Interface

Most of this runs on a schedule — heartbeat checks, cron jobs, periodic syncs. But Telegram isn't just a delivery channel; it's also a control interface for real-time overrides.

**On-demand requests work instantly:**

- *"Any urgent emails from Sarah?"* → IMAP query, response in seconds
- *"What's on my calendar tomorrow?"* → parse .ics, reply with formatted list
- *"Remind me to call the dentist at 3 PM"* → immediate one-shot cron, fires at 3 PM
- *"Check if I have any overdue follow-ups"* → reads follow-ups/ directory, surfaces items past due

This means OpenClaw operates in two modes: **automated** (scheduled checks, background sync) and **interactive** (real-time requests via Telegram). The same infrastructure handles both — no separate setup for reactive vs. proactive.

**Quick command examples you can wire up:**

| Command | Action |
|---------|--------|
| `email urgent` | Run IMAP search for urgent sender, surface latest |
| `calendar today` | Parse .ics, format today's schedule |
| `remind [text] in [duration]` | Create one-shot cron job, deliver to Telegram |
| `follow-ups` | Scan follow-ups/ directory, list open items by due date |
| `weather [city]` | Fetch wttr.in, return current conditions and forecast |

These work like slash commands without the slash — natural language requests get interpreted and routed to the right handler. The implementation is just a Telegram message trigger that routes to the appropriate agentTurn or systemEvent.

![Telegram on a phone, representing the control interface for on-demand OpenClaw queries](https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&auto=format&fit=crop&q=80)

## Memory and Context

What makes OpenClaw different from a simple cron job is memory:

- **File-based memory** — daily logs and curated long-term storage survive between sessions
- **Context awareness** — it knows who you are, your preferences, your ongoing projects
- **Learning** — when you correct it or add context, it updates its memory files

A secretary that forgets everything between conversations isn't very useful. OpenClaw's file-based memory system means context accumulates.

## Reminders and Follow-ups

With cron scheduling, OpenClaw can:
- **Set one-shot reminders** — "remind me in 2 hours to check the laundry"
- **Recurring checks** — "every Monday at 9 AM, review the week's calendar"
- **Conditional alerts** — "if the bill hasn't been paid by the 15th, ping me"

These deliver directly to your configured channel (Telegram, Discord, etc.).

### Follow-up Tracking with Memory Files

The simplest reliable follow-up system is file-based:

1. **OpenClaw creates** `follow-ups/2026-04.md` on startup
2. **Each entry** is a line: `- [ ] Reply to Sarah about Q2 budget — due 2026-04-10`
3. **Daily heartbeat** checks due items and sends reminders
4. **When done**, you reply "done" and OpenClaw marks it `[x]` and files it to `follow-ups/2026-04-done.md`

No database. No Notion. No dependencies beyond a text file and a cron job. The same file is readable by you at any time with any editor.

### A Concrete Reminder Example

Here's what a real one-shot reminder looks like in practice:

**You say:** *"Remind me in 2 hours to check the laundry."*

OpenClaw creates a timed cron job:
```json
{
  "name": "Laundry reminder",
  "schedule": { "kind": "at", "at": "2026-04-22T14:30:00-07:00" },
  "payload": { "kind": "systemEvent", "text": "Reminder: Check the laundry (set 2h ago by Tyler)" }
}
```

At 2:30 PM, you get: *"🔔 Reminder: Check the laundry."* You open the machine, switch loads, done. The job self-deletes after firing — no orphaned cron entries.

**Recurring example — weekly review every Monday at 9 AM:**
```json
{
  "name": "Weekly review",
  "schedule": { "kind": "cron", "expr": "0 9 * * 1", "tz": "America/Vancouver" },
  "payload": { "kind": "agentTurn", "message": "Run your weekly review: (1) check follow-ups/ pending items, (2) scan calendar for the week ahead, (3) flag anything due this week, (4) report to Tyler via Telegram." }
}
```

The agentTurn payload runs OpenClaw in isolation, so it does the reasoning and delivers a summary — not just a static message.

## What You Need to Set This Up

Getting this running requires a bit of upfront configuration:

- **IMAP access** — any email provider that supports IMAP (Gmail, Fastmail, self-hosted). You'll need an app password if 2FA is enabled.
- **Calendar file (.ics)** — export your calendar as an `.ics` file and keep it updated. Some calendar apps (Fastmail, Zoho) support automatic `.ics` URL refresh; others need a manual re-export on changes.
- **Telegram bot** — set up a bot via [@BotFather](https://t.me/BotFather) and grab your chat ID. This is how OpenClaw delivers messages to you directly.
- **Weather data** — `wttr.in` requires no key and is free. If you want more control, Open-Meteo is a free alternative with an API.
- **File system access** — OpenClaw needs read/write access to a memory directory where it stores `.ics` files, daily logs, and your MEMORY.md.

## A Real Morning Brief

Here's what the output actually looks like. At 7:30 AM, OpenClaw checks everything and sends you one message:

> **Good morning, Tyler. Here's your day:**
>
> ☀️ **Weather:** 14°C, partly cloudy in Vancouver. No rain.
>
> 📅 **Today:** Team standup at 9:30 AM (1h), 1:1 with Sarah at 2:00 PM (30m)
>
> 📬 **Urgent email:** [None — you have 3 unread, all from newsletters]
>
> 📝 **Notes:** Your last session mentioned the Cloudflare Workers deploy is still pending — want to revisit that today?

That's the level of coherence you can achieve. It reads your `.ics`, checks weather, queries IMAP, and combines it with your personal memory files.

## Limitations

- **No native Gmail API** — IMAP works but lacks real-time push. For instant email alerts, consider Gmail's IMAP idle or a push gateway.
- **No calendar write-back** — OpenClaw reads your `.ics` but can't modify it. For natural language scheduling ("book a call with John tomorrow at 3"), you'd need a full Calendar API integration.
- **No SMTP sending** — can't send emails directly. It can draft them and save them as files, or route them through Telegram, but outbound email requires an external service.
- **IMAP polling frequency** — email checks are pull-based. A heartbeat every 15–30 minutes is reasonable; tighter intervals increase API load and may hit rate limits.

## The Real Value

The combination of 24/7 uptime, memory across sessions, and the ability to reason about context makes this more capable than simple email filters or calendar widgets. It's not a finished product — it's infrastructure for building your own intelligent assistant.
