---
title: "OpenClaw's Security Crisis: 135,000 Exposed Instances and Nine CVEs in Four Days"
description: "A deep dive into OpenClaw's first major security crisis — 135,000+ exposed instances, nine CVEs disclosed in four days, and what the episode reveals about AI agent security as a category."
pubDate: 2026-04-30
storyOfTheDay: false
---

OpenClaw's explosive growth to 346,000 GitHub stars in early 2026 attracted more than users — security researchers began examining the framework closely, and what they found sparked the first major AI agent security crisis of the year.

Over 135,000 OpenClaw instances were found exposed on the public internet across 82 countries, more than 15,000 directly exploitable via what became CVE-2026-25253 (CVSS 8.8) — a WebSocket origin validation gap allowing one-click remote code execution from a single malicious webpage. Nine CVEs were disclosed in four days, eight classified as critical, spanning command injection, path traversal, and server-side request forgery. Of 2,857 skills in the ClawHub marketplace, 341 — 12% — were found to be malicious at time of audit.

Despite the severity, the author of the detailed breakdown notes they are still deploying OpenClaw for clients. The difference between a safe deployment and an exposed one, they argue, comes down to four configuration choices — and the architecture of persistent credentials paired with autonomous execution is a risk present in any AI agent framework, not just OpenClaw specifically.

The episode underscores a broader reality: as AI agents move from experimentation into production, the security surface is large, largely unexplored, and growing faster than the tooling to protect it.