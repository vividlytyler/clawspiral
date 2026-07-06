---
title: "OpenClaw and NVIDIA Launch Verified Agent Skills Initiative with Open Security Dataset"
description: "Every ClawHub skill now ships with an NVIDIA Skill Card verified through the ClawScan pipeline, and OpenClaw has open-sourced its 67,453-row security scan signals dataset for the broader community."
pubDate: 2026-07-06
storyOfTheDay: true
---

OpenClaw has [published](https://openclaw.ai/blog/openclaw-nvidia-skill-security) the full details of its collaboration with NVIDIA on agent skill security — and the findings are striking.

## The Problem with Agent Skills

Skill files have a trust problem. A skill can claim to summarize your logs while quietly shipping them elsewhere. A benign-looking skill can wrap a CLI that wipes production on a wrong flag. Traditional malware scanners weren't built for agentic risk — they see known bad files, not hidden instructions or misleading capability declarations.

## NVIDIA Skill Cards and SkillSpector

Every skill published through ClawHub now carries an **NVIDIA Skill Card**: an open trust-artifact specification verified by ClawHub, not self-reported by the publisher. Cards document who published the skill, what it can do, what the scanners found, and where it came from. They're readable on the skill detail page or via `openclaw skills verify <slug> --card` from the terminal.

**NVIDIA SkillSpector** is the new scanner in the pipeline. It combines static checks with AI-assisted semantic analysis to flag risks that malware scanners miss — hidden instructions, overbroad capabilities, risky code paths, dependency issues, and mismatches between declared purpose and actual behavior.

## The Scanners Barely Agree

This is where it gets interesting. Across 67,453 scanned rows, the three scanners in ClawScan — VirusTotal, static analysis, and SkillSpector — show almost no overlap:

| Scanner pair | Both positive | Jaccard agreement |
|---|---|---|
| VirusTotal + SkillSpector | 3,286 | 0.094 |
| Static analysis + SkillSpector | 3,511 | 0.104 |
| Static analysis + VirusTotal | 586 | 0.065 |

No pair agrees on more than 10.4% of combined positives. Only 0.69% of skills are flagged by all three. 81.9% of positive findings come from a single scanner alone. This isn't a flaw in any scanner — it's a testament to how different each risk surface is: VirusTotal catches malware reputation, static analysis catches dangerous code patterns, and SkillSpector catches agentic risk.

SkillSpector is positive on 48.71% of all rows but only 6.8% of malicious rows, while VirusTotal catches 72.8% of confirmed malicious rows. The complementary coverage is exactly why an LLM-as-judge like ClawScan is necessary.

## Open-Sourcing the Security Signals Dataset

Rather than keep the scan corpus private, OpenClaw is open-sourcing the full 67,453-row dataset of scanner outcomes for the security community to study and improve on. The hope is that the broader ecosystem helps sharpen detection as agentic risk evolves.

— *[OpenClaw Blog](https://openclaw.ai/blog/openclaw-nvidia-skill-security) · [NVIDIA Verified Agent Skills](https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/)*
