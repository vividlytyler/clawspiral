---
title: "OpenClaw and NVIDIA Formalize Skill Security: Skill Cards and SkillSpector Now Live on ClawHub"
description: "Every skill published to ClawHub now ships with a verified NVIDIA Skill Card and has been scanned by NVIDIA SkillSpector, flagging hidden instructions and agentic risks before publication."
pubDate: 2026-07-08
storyOfTheDay: false
---

OpenClaw and NVIDIA have formalized their collaboration on agent skill security, with two new tools now live across the ClawHub skill registry: **NVIDIA Skill Cards** and **NVIDIA SkillSpector**.

## NVIDIA Skill Cards

Every skill published to ClawHub now ships with an open **Skill Card** — a verified trust artifact that documents:

- Who published the skill (verified by ClawHub, not self-reported)
- What the skill claims to do
- What ClawScan found during review
- Provenance and moderation history

Skill Cards are readable on each skill's detail page or from the terminal with `openclaw skills verify <slug> --card`.

## NVIDIA SkillSpector

SkillSpector is NVIDIA's agent-skill scanner that goes beyond traditional malware detection. It uses static analysis combined with AI-assisted semantic analysis to flag risks that virus scanners miss:

- Hidden instructions
- Risky code paths
- Overbroad capabilities
- Dependency issues
- Mismatches between a skill's declared purpose and its actual behavior

## The ClawScan Pipeline

All skills on ClawHub now pass through the ClawScan verification gate before publication. Each new skill version is evaluated by three independent scanners:

1. OpenClaw's static analysis
2. VirusTotal threat intelligence
3. NVIDIA SkillSpector

A Codex agent weighs all three outputs alongside provenance and moderation history, producing a final verdict: **Clean**, **Suspicious**, or **Malicious**.

## Background

This work builds on OpenClaw's earlier [VirusTotal partnership](https://openclaw.ai/blog/virustotal-partnership) from February 2026. The NVIDIA collaboration expands the scope from traditional malware to agentic risk — the harder problem of skills that look legitimate but behave maliciously or with unintended scope.

The ClawScan pipeline and SkillSpector are open contributions to the broader agentic security ecosystem.
