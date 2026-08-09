---
title: "OpenClaw Main Repairs Cross-Channel Delivery Ordering and Fallbacks"
description: "A P1 repair merged on August 6 fixes Slack reply ordering, Telegram final speech delivery, Discord webhook previews, and QQBot recognition — addressing a class of bugs where the agent completes correctly but the channel adapter loses or reorders context."
pubDate: 2026-08-09
storyOfTheDay: true
---

OpenClaw merged a **P1 repair for bundled channel delivery contracts** into main on August 6, alongside focused fixes for Slack reply ordering and Telegram final-mode speech. The root issue is deceptively dangerous: the agent completes correctly, but the channel adapter loses context, reorders the result, or settles the wrong representation.

The bundled repair covers **Telegram, Slack, Discord, QQBot**, and additional provider paths. Four concrete outcomes are documented:

- **Telegram:** Pending replies survive ordinary text containing tokens shaped like `/command@bot` — command recognition no longer cancels unrelated delivery state when that string appears inside normal prose.
- **Slack:** Agent progress and final replies no longer appear above a newer human message sent while the agent was still processing. A genuine human message now establishes a conversation boundary.
- **Slack files:** A forwarded file-only message retains useful file metadata even when the actual download fails, rather than returning an empty turn.
- **Discord:** Webhook sends now honor preview policy.
- **QQBot:** Delivery targets continue to be recognized correctly.

## Why This Matters

Message order is part of conversational attribution. If a final answer appears before the question or correction that arrived during processing, users can apply the answer to the wrong turn — a subtle but real source of confusion and error in multi-turn workflows.

## Operators: Test Channel Fixtures After Upgrading

A generic "message sent" smoke test will not cover ordering, fallback, or policy inheritance. Teams should replay representative channel fixtures, specifically:

- Send a request, wait for progress, then send a second human message before completion
- Repeat with streaming disabled
- Confirm the first preview is not destructively rewritten after the boundary

Priority applies if you use Slack while agents are generating, depend on forwarded file metadata, use Telegram streaming previews or automatic final speech, govern Discord webhook previews by policy, or run QQBot, polls, SMS, or provider plugins relying on normalized delivery targets.
