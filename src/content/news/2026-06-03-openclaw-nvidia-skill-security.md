---
title: "OpenClaw and NVIDIA Partner to Harden Agent Skill Security Ecosystem"
description: "Every ClawHub skill now ships with a Skill Card and is scanned by NVIDIA SkillSpector for hidden instructions and agentic risks before publication, marking a major step toward verifiable AI agent trust."
pubDate: 2026-06-03
storyOfTheDay: true
---

OpenClaw has announced a formal collaboration with NVIDIA to harden the security of skills published through ClawHub, the project's community skill and plugin registry.

The partnership addresses a known vulnerability in the agent skills ecosystem: skills can claim one thing while bundling code that does another. Traditional malware scanners miss agentic risks entirely — a skill that claims to summarize logs could actually ship them elsewhere, or a benign-looking utility could include a flag that wipes production systems when invoked by an agent.

## How ClawScan Works

Starting today, every skill that flows through ClawHub passes a multi-scanner verification gate before it is published:

1. **Static analysis** — OpenClaw's own code inspection
2. **VirusTotal** — Industry-standard threat intelligence (a partnership first announced in February 2026)
3. **NVIDIA SkillSpector** — NVIDIA's verified agent skills scanner, which looks specifically for OWASP agentic risks

An OpenAI Codex agent then evaluates the combined output and makes a publish/no-publish decision. The full evaluation pipeline is being run as an open dataset so the community can build on it.

## Skill Cards: Knowing What You're Installing

In addition to the automated scan, every skill that passes ClawScan now ships with a **Skill Card** — a standardized disclosure document covering:

- What the skill claims to do
- Whether the code actually matches that claim
- The blast radius if something goes wrong

This gives OpenClaw operators the same kind of ingredient transparency they've come to expect from software SBOMs, adapted for the agentic era.

## Context: Why This Matters Now

OpenClaw crossed 368,000 GitHub stars and 12 million downloads in May 2026. As the project moved from scrappy open-source experiment to enterprise targeting, it became a honeypot for malicious skill submissions. The VirusTotal partnership caught real bad actors immediately, but classic malware scanning isn't designed for agentic risk. This partnership with NVIDIA — built on NVIDIA's verified agent skills initiative — is the most concrete solution to date.

The announcement came from OpenClaw's blog on June 1, 2026, authored by Vincent Koc.