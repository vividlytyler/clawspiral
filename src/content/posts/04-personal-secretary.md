---
title: "Your Personal Secretary: Email, Calendar, and Reminders"
description: "How OpenClaw can act as a persistent, memory-aware assistant for managing email, calendar events, and contextual reminders — without subscribing to another SaaS."
pubDate: 2026-03-26
category: lifestyle-wellness
tags: ["email", "calendar", "reminders", "productivity", "memory", "ical", "imap", "telegram", "follow-up", "workflow", "cron", "telegram-commands", "control-interface", "triage", "prioritization"]
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

**Option 2: Save to draft folder via IMAP.** If your mail server supports IMAP write-back, OpenClaw can APPEND to your Sent or Drafts folder — effectively writing emails that appear in your drafts folder for you to review and send. The workflow:

```
1. OpenClaw composes the email (To, Subject, Body)
2. Formats as raw IMAP message with proper headers
3. APPEND to Drafts folder with timestamps
4. Your email client picks it up on next sync
```

With Gmail or Fastmail, this is straightforward. OpenClaw uses the IMAP APPEND command:

```
A APPEND "Drafts" (\Seen) "16-Apr-2026 10:30:00 +0000"
{ size in octets }
From: tyler@example.com
To: sarah@company.com
Subject: Re: Q2 budget review
Date: Thu, 16 Apr 2026 10:30:00 +0000

Hi Sarah,
...
```

Your mail client sees it as a draft the next time it syncs — you open it, review, hit send. No copy-paste required. This is the cleanest option for moderate-volume email where you want OpenClaw to handle the drafting but you retain final approval before anything goes out.

**Option 3: CC/BCC forwarding.** Set up a rule where OpenClaw sends to itself via an external service (Mailgun, SendGrid), then your email client picks it up via filtering.

The drafting quality is where OpenClaw shines. Given a thread context and a goal ("write a reply declining the proposal but keep the door open"), it produces coherent, context-aware responses. The delivery mechanism is the solvable part.

### Email Triage on Overwhelm Days

Sometimes email piles up faster than you can handle it. OpenClaw can run an inbox triage session on demand — you forward it the batch, it sorts and prioritizes:

**You forward** a chain of 12 emails from a busy week and say: *"Triage these. Flag what needs a reply today, batch what can wait, and summarize anything I'm missing."*

**OpenClaw responds with:**

> **Today (3 items)**
> - Sarah Chen re: Q2 Budget — decision needed before Friday board meeting. Hasn't heard from you in 5 days.
> - AWS re: Reserved Instance renewal — $2,400, due in 72h, auto-renews if no action.
> - Jordan Lee re: API spec — follow-up on Tuesday's review, waiting for your sign-off.
>
> **This week (5 items)**
> - Conference acceptance (keep for travel planning)
> - Newsletter batch (unsubscribe candidates)
> - Vendor invoice (auto-routed to accounting)
>
> **Archive / ignore (4 items)**
> - Promotion announcements from SaaS tools
> - Calendar confirmations for events you already know about

The categorization criteria come from your own stated preferences — you tell OpenClaw once what "urgent" means to you (e.g., anything from Sarah, anything with a deadline in the subject, anything over $1,000), and it applies those rules consistently. This isn't just keyword filtering — it reads the content and applies judgment.

You can also run triage on a schedule: *"Every Friday at 4 PM, scan inbox for anything I missed and surface items needing weekend follow-up."* The output stays actionable rather than just a longer to-do list.

![Email triage — an overflowing inbox being sorted into organized categories on a laptop screen](https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&auto=format&fit=crop&q=80)

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

**A concrete scheduling example:**

You ask: *"Find a 1-hour slot tomorrow that works for me (Vancouver), Priya in London, and Marcus in New York."*

OpenClaw checks tomorrow's working hours across all three zones and responds:

> **Available window found: tomorrow 4:00–5:00 PM Vancouver = 12:00–1:00 PM London = 9:00–10:00 AM New York**
>
> All three are within normal working hours. Your calendar shows no conflicts at4 PM Vancouver. Should I send a calendar invite?

If you say yes, OpenClaw drafts the invite with correct timezone headers for all three recipients — they see it in their local time automatically.

The DST complication: London is GMT/UTC year-round but switches to BST in March. Vancouver switches to PDT in March. That shift changes the offset from 8 hours to 7 hours — a trap that looks fine in your calendar until the meeting lands at 6 AM your time instead of 7. OpenClaw handles the DST transition dates correctly based on the current date.

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

**A real interactive exchange:**

> **You:** Any urgent emails from Sarah?
>
> **OpenClaw:** One match from this morning:
>
> *From:* Sarah Chen \<sarah@company.com\>
> *Subject:* Re: Q2 budget review — action needed
> *Received:* Today at 8:47 AM
>
> "Hi Tyler, circling back on the budget numbers. We need your sign-off before EOD Friday or the Q2 forecast gets delayed. Want to hop on a quick call?"
>
> Flagged as urgent — 2 days until EOD deadline. IMAP thread shows 4 prior messages in this chain. Reply needed before Friday.

That's the difference between a scheduled digest and an actual conversation. OpenClaw reads the thread, applies judgment, and gives you enough to decide whether to drop what you're doing — without you having to open your email client.

![Telegram on a phone, representing the control interface for on-demand OpenClaw queries](https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&auto=format&fit=crop&q=80)

## Memory and Context

What makes OpenClaw different from a simple cron job is memory:

- **File-based memory** — daily logs and curated long-term storage survive between sessions
- **Context awareness** — it knows who you are, your preferences, your ongoing projects
- **Learning** — when you correct it or add context, it updates its memory files

A secretary that forgets everything between conversations isn't very useful. OpenClaw's file-based memory system means context accumulates.

### How Memory Integrates with Email and Calendar

The pieces connect through the file system. Your `MEMORY.md` holds the running narrative:

```
# MEMORY.md (excerpt)
- Tyler is the primary user
- Works with Sarah Chen on Q2 budget items
- Cloudflare Workers project pending deploy
- Follow-ups stored in follow-ups/ directory
```

OpenClaw reads this at the start of every session. When email arrives about the Q2 budget, it knows who Sarah Chen is and surfaces the relevant context. When you're prepping for a meeting with her, it pulls anything recent from memory before you walk in. The `.ics` and IMAP are the inputs; `MEMORY.md` is the connective tissue.

The follow-up system follows the same pattern — items live in `follow-ups/` as plain text files, readable and editable by you at any time. OpenClaw tracks state, you own the data.

![A desk with an open laptop, notebook, and coffee — representing the physical-digital memory bridge](https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80)

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

## Key Files and Directory Structure

Everything lives in plain text on the file system. Here's what the setup looks like in practice:

```
~/.openclaw/workspace/
├── MEMORY.md                    # Long-term context (who you are, projects, preferences)
├── memory/
│   ├── 2026-04-01.md           # Daily session logs
│   ├── 2026-04-02.md
│   └── ...
├── calendar/
│   ├── work.ics                # Work calendar export
│   └── personal.ics            # Personal calendar export
├── follow-ups/
│   ├── pending.md              # Open follow-up items
│   └── 2026-04-done.md         # Completed items (by month)
└── approved-vendors.json       # Vendor allowlist for invoice routing
```

The directory structure is flexible — you can adjust paths in your `TOOLS.md` or cron configs. The only firm requirement is that OpenClaw has read/write access to wherever you store your calendar `.ics` files, memory logs, and follow-up tracking files. Everything else (vendor lists, approved senders, filter rules) lives wherever makes sense in your workspace.

The follow-up system in particular is designed to be human-readable at a glance. `follow-ups/pending.md` is just a markdown checklist:

```
# Follow-ups — as of 2026-04-15

- [ ] Reply to Sarah about Q2 budget — due 2026-04-10 (3 days overdue)
- [x] Confirm Cloudflare Workers deploy date — done 2026-04-12
- [ ] Send invoice to Widget Corp — due 2026-04-20
```

OpenClaw reads and writes this file directly. You can also edit it manually — the format is just markdown checkboxes. This means you're never locked into a specific tool; if OpenClaw disappeared tomorrow, you'd still have a readable plain-text task list.

The same applies to `approved-vendors.json` — it's a plain JSON file you can edit in any text editor:

```json
{
  "approved": ["Widget Corp", "Linode", "Fastmail"],
  "autoApproveUnder": 500,
  "flagOver": 2000
}
```

No database migrations, no vendor lock-in, no export required. The data is yours.

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

## Related Use Cases

This workflow connects naturally with several others in the ClawSpiral library:

- **[Financial Pulse](/use-cases/10-financial-pulse/)** — Invoice processing and bill tracking complement the email monitoring here. When a vendor invoice arrives, OpenClaw can route it for approval; when a subscription renewal hits your bank feed, it flags as an anomaly.
- **[Employee Scheduling](/use-cases/06-employee-scheduling/)** — Scheduling coordination uses the same calendar infrastructure. The conflict detection and timezone logic in both use cases can share a common `.ics` parsing utility.
- **[Research Pipeline](/use-cases/02-research-pipeline/)** — Meeting preparation in the secretary workflow is where research output gets consumed. A budget review meeting with Sarah might surface findings from a research session on vendor pricing models.

## Limitations

- **No native Gmail API** — IMAP works but lacks real-time push. For instant email alerts, consider Gmail's IMAP idle or a push gateway.
- **No calendar write-back** — OpenClaw reads your `.ics` but can't modify it. For natural language scheduling ("book a call with John tomorrow at 3"), you'd need a full Calendar API integration.
- **No SMTP sending** — can't send emails directly. It can draft them and save them as files, or route them through Telegram, but outbound email requires an external service.
- **IMAP polling frequency** — email checks are pull-based. A heartbeat every 15–30 minutes is reasonable; tighter intervals increase API load and may hit rate limits.
- **Memory staleness** — the value of the memory system depends on it actually being maintained. If `MEMORY.md` isn't updated regularly (which requires discipline), the context benefit degrades to near-zero. Treat your memory files like a shared notebook — useful only if both you and OpenClaw write to it.

## The Real Value

The combination of 24/7 uptime, memory across sessions, and the ability to reason about context makes this more capable than simple email filters or calendar widgets. It's not a finished product — it's infrastructure for building your own intelligent assistant.
