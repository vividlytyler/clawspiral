---
title: "OpenClaw and NVIDIA Partner on Verified Agent Skills Initiative"
description: "OpenClaw's ClawHub skill registry now integrates NVIDIA SkillSpector into its ClawScan verification pipeline, combining static analysis, VirusTotal scanning, and NVIDIA's model-based agentic-risk detection before any skill is published."
pubDate: 2026-06-22
storyOfTheDay: false
---

Agent skill files carry risks that traditional malware scanners cannot catch. A skill might claim to summarize logs while actually shipping them elsewhere. A well-meaning skill could point an agent at a CLI that wipes production on the wrong flag. OpenClaw has been tackling this problem since launch, first by partnering with VirusTotal to detect malicious skill publishers. But classic virus scanning was never built for agentic risk — the problem where a skill's *intent* and *behavior* diverge.

On June 1, OpenClaw announced an expansion of that work: a new collaboration with NVIDIA on its **Verified Agent Skills initiative**. Every skill flowing through ClawHub now passes through the **ClawScan pipeline**, which feeds three independent scanners to an OpenAI Codex agent for evaluation:

1. **OpenClaw's own static analysis**
2. **VirusTotal** — for traditional threat intelligence
3. **NVIDIA SkillSpector** — NVIDIA's model-based detection of agentic risks

The Evaluate step weighs outputs from all three before a skill is cleared for catalog publication. The initiative is open — OpenClaw is sharing a public dataset so the broader community can build on it. ClawHub also publishes a **Skill Card** with every skill, documenting what it claims to do, where it came from, and what its blast radius is if something goes wrong.

The partnership reflects a broader industry recognition: as AI agents proliferate, the supply chain for agentic capabilities — skills, plugins, tools — needs the same scrutiny that software supply chains received with SBOMs and package signing.
