---
title: "OpenClaw and NVIDIA Partner on Skill Security Framework"
description: "Every ClawHub skill now ships with a Skill Card documenting its purpose and origin, and is scanned by NVIDIA's SkillSpector for hidden instructions and agentic risks before publication."
pubDate: 2026-06-12
storyOfTheDay: false
---

OpenClaw announced a collaboration with NVIDIA focused on securing the skill ecosystem that powers its agents. The partnership introduces two key mechanisms:

**Skill Cards** are now required on all ClawHub submissions — documentation that clearly states what a skill does, what data it accesses, and where it came from. The goal is transparency: users can inspect a skill's provenance before granting it access to their workspace.

**SkillSpector**, NVIDIA's threat intelligence scanning tool, runs on every skill at publish time. It checks for hidden instructions, exfiltration payloads, and other risks specific to agentic AI workloads — the class of vulnerabilities highlighted by this week's Imperva and Varonis research.

The collaboration builds on NVIDIA's broader NemoClaw initiative, which aims to bring Nemotron models and the OpenShell runtime to OpenClaw users in a single command. Skill security is positioned as a prerequisite for that deeper integration.

OpenClaw's blog post frames the partnership as part of a longer security roadmap that includes exec guardrails, VirusTotal scanning, and a public audit program.