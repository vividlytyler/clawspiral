---
title: "State of OpenClaw 2026: Enterprise Adoption, NVIDIA NemoClaw, and Open Security Questions"
description: "OpenClaw crossed 368,000 GitHub stars and 12 million downloads as enterprise teams re-evaluate self-hosted AI agent platforms in light of hosted-AI vendor boundary enforcement and sovereign AI procurement trends."
pubDate: 2026-05-22
storyOfTheDay: false
---

The [State of OpenClaw 2026 report from BigHat Group](https://www.bighatgroup.com/blog/state-of-openclaw-2026-enterprise-self-hosted-ai-agent/) frames May 2026 as the inflection point where OpenClaw stopped being a scrappy open-source project and became an enterprise target.

**The numbers:** OpenClaw's GitHub repository crossed 368,000 stars and 12 million downloads. NVIDIA shipped NemoClaw alpha—a hardened fork integrating NeMo guardrails and OpenShell sandboxes aimed at buyers who need something defensible in architecture reviews.

**The context:** Three trends collided in April:

1. **Hosted-AI vendor enforcement**: Flat-rate plans that quietly absorbed third-party agent harness traffic are being reclassified or surcharged. Capacity is finite; unit economics are under pressure.

2. **Sovereignty and procurement scrutiny**: Government advisories on autonomous AI agents issued in Belgium, China, and South Korea. Procurement teams asking where prompts and artifacts physically reside.

3. **Enterprise-grade hardening exists**: NemoClaw gives risk-averse buyers a hardened fork to point to.

**The HERMES.md controversy:** Reports emerged that Claude Code scans repositories for `HERMES.md`—the OpenClaw agent configuration file—and either refuses requests or routes them to higher-cost billing tiers, with users reporting cost increases up to 50x. The story hit 1,336 Hacker News upvotes and 718 comments on April 30.

**The Tencent angle:** Full-time Tencent maintainers committed to the project, signaling corporate investment in OpenClaw's future.

For enterprise IT teams, the question has shifted from "is OpenClaw real?" to "what is our exposure if we don't have a deployment plan?"