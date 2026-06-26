---
title: "New Attacks Trick OpenClaw Into Running Code and Leaking Secrets"
description: "Imperva and Varonis independently published research showing OpenClaw agents can be manipulated via prompt injection through contacts, vCards, and emails — one flaw is patched, the other requires access controls."
pubDate: 2026-06-26
storyOfTheDay: true
---

Two security research teams published separate findings this week demonstrating how OpenClaw agents can be tricked into executing attacker-controlled code or exfiltrating sensitive data through ordinary-looking inputs.

**Imperva** found that OpenClaw's messaging layer passes shared contact, vCard, and location data to the underlying LLM without wrapping it in an untrusted-content marker. When a contact name contains angle brackets, the model cannot distinguish the real name from an injected instruction. The visible contact name truncates on WhatsApp and in other apps, so victims never see the malicious payload.

That flaw is patched in **OpenClaw 2026.4.23** — update if you're running an earlier version.

**Varonis** took a different angle: it built a test agent on OpenClaw, gave it a mailbox full of synthetic business data, and sent it a single phishing email. The email talked the agent into forwarding mock AWS keys and a fake customer export to an outside address. Unlike the Imperva finding, this isn't patchable — it stems from the agent having too much autonomous access.

The core issue in both cases is the same: the agent trusts what reaches it, and its access becomes the attacker's. Limiting what autonomous agents can do on your behalf is the only real defense against the Varonis-class attacks.

Source: [The Hacker News](https://thehackernews.com/2026/06/new-attacks-trick-openclaw-ai-agent.html)