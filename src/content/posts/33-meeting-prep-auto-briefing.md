---
title: "Never Walk Into a Meeting Cold: The Auto-Prep Briefing"
description: "OpenClaw synthesizes everything it knows before every meeting — past conversations, relevant emails, project files, and research — and delivers a prep brief to your phone before you walk in."
pubDate: 2026-04-15
category: business-finance
tags: ["meetings", "preparation", "context", "memory", "calendar", "research", "telegram", "productivity", "workflow"]
image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop"
---

![Person reviewing notes before a meeting](https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop)

You have a meeting in 20 minutes. Do you remember what you discussed with this person last time? Do you know what you were supposed to follow up on? Do you have the numbers they asked for?

Most people's pre-meeting routine is showing up and hoping for the best. OpenClaw can do the prep work for you — pulling context from your memory files, email threads, project notes, and the web, then delivering a briefing to Telegram before you sit down.

## What Problem This Solves

Meetings are expensive. An hour with five people is five hours of person-time. Yet most participants arrive having barely glanced at the agenda, if there even is one. The meeting time gets spent recovering context rather than making decisions.

The prep work exists — it's scattered across your email, your notes, your chat history, and whatever you remember from last time. OpenClaw synthesizes all of it before every meeting so you can walk in sharp.

## How It Works

The pipeline has three stages:

**1. Calendar scan** — Before each meeting, OpenClaw reads your `.ics` calendar file (or monitors it via cron) and extracts the meeting details: title, time, attendees, location or video link, and any agenda description.

**2. Context aggregation** — For each upcoming meeting, OpenClaw cross-references:
- Your `memory/` directory for any past sessions mentioning the meeting title, attendees, or topics
- Email threads involving the attendees (via IMAP)
- Project files related to what's being discussed
- Any documents you've saved about the client, project, or subject

**3. Briefing delivery** — A Telegram message lands in your phone 15–30 minutes before the meeting starts. You read it for 3 minutes. You walk in knowing what was said last time, what you're supposed to deliver, and what you need to find out.

## A Real Example

You have a client call at 2 PM with Sarah Chen from Acme Corp. At 1:40 PM, this arrives in Telegram:

> **📋 MEETING PREP — 2:00 PM**
> **Acme Corp Q2 Review | Sarah Chen**
>
> **📌 Previous context (from memory):**
> - Last call (Mar 28): Sarah flagged delayed deliverables on Phase 2. You committed to sending an updated timeline by Apr 3.
> - Action item open: Send revised Phase 2 timeline — you noted in session it was "mostly done, just need legal's sign-off on 2 milestones."
> - Sarah's team grew by 3 people last month — might affect scope expectations.
>
> **📧 Recent emails:**
> - Apr 11: Sarah asked if the timeline update was ready. No reply yet.
> - Apr 8: You forwarded the draft timeline to legal.
>
> **📁 Relevant files:**
> - `projects/acme/timeline-draft-v3.pdf` (shared with legal Apr 8)
> - `projects/acme/notes.md` — 14 entries, last updated Apr 3
>
> **⚠️ Flags:**
> - You've been waiting on legal for 7 days. Might need to escalate.
> - Sarah's email tone was neutral but pointed. Be ready to give a clear status.
>
> **🔗 Video link:** https://zoom.us/j/928174

That's the full picture. You know exactly where you stand, what you owe, and what Sarah is likely to push on.

## What OpenClaw Pulls Together

### From Memory Files

OpenClaw scans your `memory/` directory — the daily logs and long-term memory — for any mention of the meeting title, attendees, or related topics. If you discussed this project two weeks ago, it surfaces the key points. If you committed to a follow-up, it knows and flags it.

This works because OpenClaw's memory is file-based. Every significant conversation gets logged. When a meeting is coming up, it searches that history automatically.

### From Email

Via IMAP, OpenClaw searches your inbox for recent messages involving the attendees. It pulls the last 3–5 relevant threads and extracts key points: what was asked, what was promised, what's unresolved.

### From Project Files

If the meeting is about a specific project, OpenClaw reads the relevant project directory — scope documents, timelines, status notes — and extracts what's current and relevant.

### From the Web (Optionally)

If the meeting is with someone you haven't interacted with much — a new prospect, a vendor, an interview — OpenClaw can do a quick web search. It finds recent news about their company, their LinkedIn background, or any prior public context that helps you walk in informed.

## Setting Up the Scheduler

The timing is handled by a cron job that fires 30 minutes before your typical meeting windows:

```json
{
  "schedule": {
    "kind": "cron",
    "expr": "0 8,13,17 * * 1-5",
    "tz": "America/Vancouver"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Check today's calendar. For any meeting starting within the next 30 minutes, generate a prep brief and send it to Telegram. Skip meetings that already received a brief today.",
    "timeoutSeconds": 120
  },
  "delivery": {
    "mode": "announce"
  }
}
```

This fires at 8 AM (morning meetings), 1 PM (afternoon), and 5 PM (evening) on weekdays. It catches most meetings without spamming you outside your workday.

## Customizing the Briefing Format

The briefing format is fully customizable. In your preferences file, you define:

- **What sections appear** — you might want to see previous action items prominently for client calls, but skip web research for internal team meetings
- **Priority attendees** — if multiple people are in the meeting, which ones get the deep-dive treatment
- **Silence threshold** — how far in advance you want to be notified (15 minutes is default, but you might want 30 for high-stakes client calls)
- **What triggers a "web research" section** — new contacts, prospects, interview candidates

## What You Need to Set It Up

- **OpenClaw** running on a server or always-on machine
- **An `.ics` calendar file** — exported from your calendar app and stored locally. Some services (Fastmail, Zoho) support auto-refreshing `.ics` URLs
- **IMAP access** — to pull relevant email threads about meeting attendees
- **A memory directory** — `memory/` with daily logs and long-term context. OpenClaw needs historical sessions to pull from
- **A project directory (optional)** — `projects/` or similar, with files organized by client or topic. The more organized your files, the richer the briefings
- **A Telegram bot** — for delivery to your phone

## Limitations

**Context is bounded by what you've logged.** If you've never discussed a project with OpenClaw, it has no memory of it. The briefing quality is proportional to how consistently you use OpenClaw for related work. Briefings for clients you've never mentioned will be thin — but even a name and company pulled from the web is better than nothing.

**No native calendar write-back.** OpenClaw reads your calendar but can't add meetings or send invites. For that, you still need your calendar app.

**IMAP polling lag.** Email checks run on a heartbeat interval (typically 15–30 minutes). Very recent emails from the last hour may not appear in the briefing. Configure your heartbeat frequency based on how much lead time you need.

**No automatic agenda input.** If someone sends a meeting agenda separately, forward it to OpenClaw and it will incorporate the notes. There's no native Zoom or Meet transcription integration — it can't watch the meeting for you.

## Why This Works

The value of a meeting is proportional to the preparation of the people in it. Showing up with context — knowing what was decided last time, what you promised to follow up on, what the other person's concerns are — changes the quality of the conversation.

OpenClaw does the gathering. You do the thinking. The briefing arrives before you're stressed about being late, giving you time to actually read it.

Set it up once. Every meeting after that, you walk in sharp.
