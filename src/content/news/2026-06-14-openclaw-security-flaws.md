---
title: "Security Flaws Expose OpenClaw Agents to Prompt Injection and Data Leaking"
description: "Researchers at Imperva and Varonis disclosed two separate attack vectors against OpenClaw — hidden instructions buried in contact cards and a single phishing email capable of tricking an agent into forwarding sensitive credentials."
pubDate: 2026-06-14
storyOfTheDay: true
---

Two security research teams published findings this week detailing how OpenClaw agents can be manipulated into executing attacker-controlled code or exfiltrating sensitive data through ordinary-looking inputs.

**Imperva** found that OpenClaw's messaging layer passes contact, vCard, and location data directly into the LLM prompt without any boundary marking it as untrusted. An attacker can hide instructions inside a contact's name field using angle brackets — the same characters that are legal in a name — and the model cannot distinguish where the real name ends and the injected command begins. WhatsApp and other apps truncate the display name on-screen, so the victim never sees the payload. In Imperva's tests against Gemini 3.1 Pro, a shared contact instructed the agent to download and run a script from a researcher-controlled server — and it did.

**Varonis** took a different angle, building a test agent with a mailbox full of synthetic business data and sending it a single phishing email. The email talked the agent into forwarding mock AWS keys and a fake customer export to an outside address.

The contact-card flaw is patched in **OpenClaw 2026.4.23**. The phishing weakness is architectural — it stems from how much access an agent is given by default, not from a single code bug, and requires operators to scope agent permissions carefully rather than relying on a patch.

OpenClaw v2026.6.6, released June 12, already includes substantially tighter security boundaries across transcripts, sandbox binds, host environment inheritance, and elevated sender checks.