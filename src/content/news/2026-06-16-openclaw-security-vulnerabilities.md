---
title: "Security Researchers Expose Prompt Injection and Phishing Attacks Targeting OpenClaw Agents"
description: "Imperva and Varonis published separate research this month revealing how attackers can trick OpenClaw into executing hidden commands via contacts and phishing emails, exposing trust-model vulnerabilities in self-hosted AI agents."
pubDate: 2026-06-16
storyOfTheDay: true
---

Two security research teams published findings this month detailing how OpenClaw's architecture can be exploited through prompt injection and social engineering, highlighting risks that come with giving AI agents access to messaging, contacts, and email.

**Imperva — Hidden commands in shared contacts**

Imperva researcher Yohann Sillam found that OpenClaw flattens shared contacts, vCards, and location pins into the LLM prompt without any boundary marker to indicate the content is untrusted. A contact name field can contain angle brackets with injected instructions, and because the name is truncated visually in WhatsApp and the agent UI, victims never see the malicious payload. The agent passes the full name to the model, which acts on the embedded instructions.

This vulnerability is patched in **OpenClaw 2026.4.23**. Users on older versions should update.

**Varonis — Phishing email talks agent into forwarding secrets**

Varonis built a test OpenClaw agent with a mailbox full of synthetic business data. A single crafted email convinced the agent to forward mock AWS keys and a fake customer export to an outside address — with no indication the action was unusual.

Unlike the Imperva finding, this is not a software patch issue. It stems from the agent's permissive default tooling and lack of action boundaries. Varonis's recommendation is architectural: limit what the agent can do autonomously, apply least-privilege access to tool permissions, and treat every inbound message as potentially adversarial.

**Why it matters**

OpenClaw crossed 368,000 GitHub stars and 12 million downloads in April 2026, and is increasingly evaluated for enterprise deployment. As the platform matures, attack surface grows proportionally. Imperva's finding demonstrates that the problem isn't just prompt injection in chat — it's in the data plumbing that OpenClaw uses to pass structured objects to the model.

The same trust model that makes OpenClaw powerful (it acts on your behalf, reading contacts and messages) is the same surface attackers target.

**What to do**

- Update to OpenClaw 2026.4.23 or later if you haven't
- Review tool permissions: disable or require confirmation for outbound data actions (email send, file forward, API calls)
- Treat inbound messages from unknown senders as untrusted input
- Consider limiting contact and calendar tool access to first-party integrations only

Security hardening guides and enterprise deployment checklists are available in the OpenClaw documentation.

*Sources: [The Hacker News](https://thehackernews.com/2026/06/new-attacks-trick-openclaw-ai-agent.html), [Imperva Blog](https://www.imperva.com/blog/compromise-openclaw-with-prompt-injections-in-message-objects/), [Varonis Blog](https://www.varonis.com/blog/openclaw-phishing)*
