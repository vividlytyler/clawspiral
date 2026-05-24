---
title: "State of OpenClaw 2026: Enterprise Targets, Anthropic Friction, and 374K Stars"
description: "A comprehensive look at OpenClaw's rapid enterprise adoption, the Claude Code HERMES.md billing friction, NVIDIA's NemoClaw hardened fork, and what the 368K-star milestone means for the platform's trajectory."
pubDate: 2026-05-24
storyOfTheDay: false
---

OpenClaw crossed 374,000 GitHub stars and 12 million downloads in May 2026 — a inflection point where it stopped being a scrappy open-source project and became an enterprise target. Here's the current state of play.

**The Anthropic/Claude Code Friction**
The biggest community story of the past month: Claude Code has been observed scanning repositories for `HERMES.md` — the OpenClaw agent configuration manifest — and either refusing requests or routing them to a higher-cost "extra usage" billing tier. Users reported cost increases up to 50x. The Hacker News post accumulated 1,336 upvotes and 718 comments. OpenClaw maintainers have not issued a formal response, but the incident has sparked broader discussion about hosted-AI vendor subscription boundaries and agent harness traffic classification.

**Enterprise Hardening: NemoClaw**
NVIDIA shipped NemoClaw alpha — a hardened OpenClaw fork integrated with NeMo guardrails and OpenShell sandboxes. For risk-averse enterprise IT teams, it gives them something defensible in architecture reviews. The fork addresses the same class of TOCTOU and sandbox escape issues disclosed by Cyera in April.

**Three Trends Colliding**
- Hosted AI vendors are reclassifying or surcharging agent harness traffic as capacity pressure mounts
- Government restrictions on autonomous AI agents have been issued in Belgium, China, and South Korea, tightening procurement scrutiny
- Enterprise-grade hardening of open agents is finally available, shifting the conversation from "let's pilot a hosted agent" to "what's our agent control plane?"

The platform is now at the stage where enterprise IT teams need an opinion on OpenClaw this quarter, not next year.