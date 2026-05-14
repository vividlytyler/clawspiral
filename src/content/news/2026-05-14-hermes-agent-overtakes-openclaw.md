---
title: "Hermes Agent Overtakes OpenClaw on OpenRouter Daily Rankings"
description: "Nous Research's Hermes Agent has claimed the #1 spot on OpenRouter's global daily app and agent rankings, surpassing OpenClaw with 224 billion daily tokens versus OpenClaw's 186 billion."
pubDate: 2026-05-14
storyOfTheDay: true
---

As of May 10, 2026, [Hermes Agent](https://github.com/NousResearch/hermes-agent) — built by Nous Research — has overtaken OpenClaw to hold the #1 position on [OpenRouter's global daily app and agent rankings](https://openrouter.ai/apps). Hermes is currently generating 224 billion daily tokens on OpenRouter versus OpenClaw's 186 billion, making it the most actively used open-source AI agent by inference volume.

The milestone is notable given OpenClaw's massive scale: the repository has crossed 368,000 GitHub stars and 12 million downloads. OpenClaw's founder Peter Steinberger [joined OpenAI in February 2026](https://steipete.me/posts/2026/openclaw), while OpenClaw moved to an independent open-source foundation with OpenAI as a sponsor.

## Two Different Architectures

The rivalry reflects a fundamental split in how open-source agents are designed. OpenClaw is built around a central WebSocket Gateway — a persistent routing layer connecting 50+ messaging channels (Telegram, Discord, Slack, WhatsApp, Signal, and more) to an agent runtime. Its design optimizes for reach: how many surfaces the agent can operate across simultaneously.

Hermes Agent takes the opposite approach. Built under an MIT license, it centers on a "do, learn, improve" execution loop. After completing a task, the agent enters a reflective phase where it analyzes its own performance and autonomously generates reusable skill files for future use. Memory is handled through three layers: a persistent snapshot of user and agent identity, a SQLite FTS5 full-text search database of every past session, and procedural skill files that capture repeatable task logic. The design is built for compounding value over time — the longer you run Hermes, the more optimized it becomes for your specific workflows.

## Hermes's Rapid Release Cadence

Hermes has shipped major releases regularly since its February 2026 launch:

- **v0.9.0 "Everywhere"** brought Android/Termux support, iMessage via BlueBubbles, WeChat and WeCom adapters, and a local web dashboard, pushing Hermes to 16 supported messaging platforms
- **v0.11.0 "Interface"** delivered a full React/Ink TUI rewrite, native AWS Bedrock support, five new inference paths including NVIDIA NIM and Vercel ai-gateway, GPT-5.5 access via Codex OAuth, and a 17th platform via QQBot — across 1,556 commits and 761 merged PRs
- **v0.13.0 "Tenacity"** (May 7, 2026) introduced Kanban as a durable multi-agent task board with heartbeat monitoring, zombie detection, and hallucination recovery; a /goal command that locks the agent on a target across turns; Checkpoints v2 with real state pruning; gateway auto-resume after restart; and Google Chat as the 20th supported messaging platform

## Security: A Contrast Worth Noting

OpenClaw's scale has come with security costs. [CVE-2026-25253](https://nvd.nist.gov/vuln/detail/CVE-2026-25253) and subsequent CVEs have affected a large install base. Hermes's architecture, by contrast, emphasizes self-improvement and reflection, though its rapid feature expansion may bring its own security considerations.

The full implications of this ranking shift remain to be seen. OpenClaw retains a larger overall community, more integrations, and the benefit of a more mature codebase — but Hermes's learning-forward design is proving compelling to developers evaluating agent platforms.