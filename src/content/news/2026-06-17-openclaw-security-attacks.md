---
title: "Researchers Expose Two New Attack Classes Targeting OpenClaw Agents"
description: "Imperva and Varonis independently demonstrated how OpenClaw can be tricked into running attacker-controlled code or exfiltrating secrets through ordinary-looking inputs like contacts and emails."
pubDate: 2026-06-17
storyOfTheDay: true
---

Two separate security research teams have published findings this week showing how OpenClaw agents can be manipulated into executing unauthorized code and leaking sensitive data — through inputs that look completely ordinary to end users.

## Hidden Commands in a Shared Contact

Imperva researcher Yohann Sillam found that OpenClaw's handling of shared contacts, vCards, and location pins is exploitable. When the agent passes this data to the LLM, it flattens the object into the prompt inline, with no boundary marking it as untrusted. Web content gets wrapped in an untrusted-content marker — message objects do not.

A shared contact sends just the name field, serialized as `<contact: name, number>`. Because angle brackets are legal in a contact name, the model cannot tell where the real name ends and an injected instruction begins. The contact name is also truncated where it shows on screen, both in WhatsApp and in the agent's own UI — so the malicious content is never fully visible to the victim.

This flaw is patched in **OpenClaw 2026.4.23**. Users on older versions should update immediately.

## Phishing a Live Agent

Varonis took a different approach — building a test agent on the OpenClaw platform, giving it a mailbox full of synthetic business data, and watching a single plain email talk it into forwarding mock AWS keys and a fake customer export to an outside address.

Unlike the Imperva finding, this is not patchable with a software update. It stems from the agent's level of agency and trust: if an agent can send emails on your behalf, a well-crafted prompt injection can abuse that capability. The defense here is architectural — limiting what the agent can do autonomously rather than filtering what it receives.

## The Common Root Cause

Both attacks open different doors into the same room: the agent trusts what reaches it, and its access becomes the attacker's. The fix for injection in contacts is done (v2026.4.23). The fix for social-engineered agency abuse is an ongoing security engineering problem — which is why OpenClaw has been pushing toward finer-grained exec approvals and opt-in auto mode for sensitive operations.

**Update if you're on any version before 2026.4.23. For the phishing risk: review what your agent can do on its own and apply least-privilege principles to its channel permissions.**
