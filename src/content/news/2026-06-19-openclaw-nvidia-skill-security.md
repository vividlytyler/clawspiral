---
title: "OpenClaw and NVIDIA Partner on Agent Skill Security: SkillSpector and Skill Cards Now Live"
description: "Every ClawHub skill now ships with a verified NVIDIA Skill Card, and all skills are scanned by NVIDIA SkillSpector alongside VirusTotal before publication."
pubDate: 2026-06-19
storyOfTheDay: true
---

OpenClaw has formalized its collaboration with NVIDIA on agent skill security, bringing two major additions to the ClawHub ecosystem: **NVIDIA Skill Cards** and **NVIDIA SkillSpector**.

## What Changed

**Skill Cards** are now published with every ClawHub skill. Each card documents who published the skill, what it claims to do, what the security scans found, and exactly where the skill came from. Crucially, these details are verified by ClawHub — not taken from the publisher's self-description. Cards are readable on the skill detail page or via the terminal with `openclaw skills verify <slug> --card`.

**SkillSpector** is NVIDIA's new agent-skill scanner. It combines static analysis with AI-assisted semantic analysis to catch risks that traditional malware scanners miss: hidden instructions, risky code paths, overbroad capabilities, dependency issues, and mismatches between a skill's declared purpose and its actual behavior.

## The ClawScan Pipeline

Every new skill version on ClawHub now passes through a three-scanner gate before publication:
- OpenClaw's own static analysis
- VirusTotal threat intelligence
- NVIDIA SkillSpector

An OpenAI Codex agent evaluates all three outputs alongside provenance, metadata, and moderation history, then produces a Skill Card and a final verdict: **Clean**, **Suspicious**, or **Malicious**.

## Why It Matters

Agent skills have historically been a trust gap. A skill can claim to summarize logs while actually exfiltrating them. Traditional AV tools aren't built to catch that. The NVIDIA partnership moves this verification into an open, community-auditable process — and produces artifacts anyone can inspect.

This follows OpenClaw's earlier VirusTotal partnership from February 2026.