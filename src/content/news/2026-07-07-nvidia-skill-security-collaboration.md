---
title: "OpenClaw and NVIDIA Launch Verified Agent Skills Initiative with SkillSpector"
description: "OpenClaw's collaboration with NVIDIA introduces SkillSpector AI-assisted scanning and NVIDIA Skill Cards — an open trust-artifact spec — to the ClawHub ecosystem, giving users verifiable provenance for every published skill."
pubDate: 2026-07-07
storyOfTheDay: false
---

OpenClaw and NVIDIA have formalized their partnership around agent skill security, moving from reactive malware scanning to a proactive, ecosystem-scale trust infrastructure.

## The Problem with Skills

Agent skill files carry inherent risk that traditional virus scanners can't catch. A skill that claims to "summarize your logs" could actually bundle a script that exfiltrates them. A well-meaning skill might point an agent at a CLI that wipes production on the wrong flag. Neither is classic malware — and neither would be flagged by a traditional scanner.

## NVIDIA SkillSpector

The centerpiece of the collaboration is **NVIDIA SkillSpector**: an AI-assisted scanner that combines static analysis with semantic reasoning to surface agentic risks — hidden instructions, risky code paths, overbroad capabilities, dependency issues, and mismatches between a skill's stated purpose and its actual behavior.

## NVIDIA Skill Cards

Every skill published through ClawHub now ships with a **NVIDIA Skill Card**: an open trust-artifact specification that documents who published it, what it can do, what ClawScan found during verification, and exactly where it came from. These cards are verified by ClawHub against the publisher's claims — not self-attested.

Users can read skill cards on the ClawHub detail page, or from the terminal:
```bash
openclaw skills verify <slug> --card
```

## ClawScan Pipeline

When a new skill version is published, an OpenAI Codex agent receives the output of three independent scanners as context: OpenClaw's static analysis, VirusTotal (already integrated since February 2026), and NVIDIA SkillSpector. ClawScan weighs all three alongside provenance, metadata, and moderation history, then produces a Skill Card with a final verdict: **Clean**, **Suspicious**, or **Malicious**.

This represents a significant step toward making the open-source agent skill ecosystem auditable and trustworthy at scale — a necessary foundation as OpenClaw's user base continues to expand.
