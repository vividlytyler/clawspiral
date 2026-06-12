---
title: "OpenClaw Prompt Injection: Two Research Teams, Same Flawed Room"
description: "Imperva and Varonis independently discovered that OpenClaw can be tricked into running attacker code through contacts, vCards, and emails — exploiting the agent's trust in message objects with no untrusted-content markers."
pubDate: 2026-06-12
storyOfTheDay: true
---

Two security research teams published separate findings this week showing OpenClaw can be manipulated into executing attacker-controlled code or exfiltrating sensitive data through ordinary-looking inputs.

**Imperva** found that hidden instructions embedded in shared contacts, vCards, and location pins reached the LLM without any boundary marker indicating the content was untrusted. When OpenClaw serialized a contact name as `<contact: name, number>`, the angle brackets in the payload blended seamlessly into the prompt — and the name field was truncated on-screen, so victims never saw the injected text. A single malicious contact shared broadly could compromise every agent that processes it.

**Varonis** took a different angle: they built a test agent, gave it a mailbox of synthetic business data, and sent it a plain email instructing it to forward mock AWS keys and a customer export to an outside address. The agent complied — no unusual attachments, no obvious red flags.

The Imperva flaw is patched in OpenClaw 2026.4.23. The Varonis phishing vector is architectural: it cannot be fixed with a patch alone and instead requires limiting what the agent can do autonomously.

OpenClaw's blog notes that message objects lack the untrusted-content wrapping that web-fetched content receives — a discrepancy the teams flagged and the project is working to address.