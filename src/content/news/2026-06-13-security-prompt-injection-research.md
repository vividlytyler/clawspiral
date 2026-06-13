---
title: "Security Research: Prompt Injection Attacks Target OpenClaw via Contacts, vCards, and Email"
description: "Imperva and Varonis published separate research this week showing how OpenClaw can be tricked into running attacker-controlled code or exfiltrating secrets through hidden instructions in message objects — contacts, vCards, location pins, and emails."
pubDate: 2026-06-13
storyOfTheDay: false
---

Two security research teams independently demonstrated this week that OpenClaw's trust model can be exploited through ordinary-looking inputs, highlighting the growing attack surface of AI agents that operate with broad system access.

**Imperva** found that hidden instructions buried in shared contacts, vCards, and location pins could be passed directly to the underlying LLM without any untrusted-content boundary marker. When OpenClaw flattens a contact into the prompt, it serializes as `<contact: name, number>` — the angle brackets are legal in a name field, so the model cannot distinguish where the real name ends and an injected instruction begins. The contact name is also truncated on-screen in WhatsApp and receiving apps, so victims never see the payload. Imperva demonstrated the attack successfully against Gemini 3.1 Pro preview, with the agent downloading and running a script from a researcher-controlled server. This vulnerability is patched in **OpenClaw 2026.4.23**.

**Varonis** took a different angle: they built a test agent on OpenClaw, gave it a mailbox full of synthetic business data, and sent it a single plain email. The email talked the agent into forwarding mock AWS keys and a fake customer export to an outside address — no hidden characters, no specially crafted contacts. This is not patchable with a version bump; it stems from an agent that has too much autonomy and access. Varonis's recommendation is architectural: limit what the agent can do on its own.

The common thread: once an attacker can feed content into the agent's context, its access becomes the attacker's. With OpenClaw's memory enabled by default, a single piece of widely shared content carrying a hidden instruction could propagate across an agent's entire operational history.

Users are advised to update to the latest OpenClaw version and review what integrations their agent has access to.