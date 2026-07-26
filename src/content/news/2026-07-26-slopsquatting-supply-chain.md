---
title: "Research: Slopsquatting Attack Targets AI Agent Ecosystems Including OpenClaw"
description: "New research demonstrates that AI agents — including OpenClaw — can be manipulated into requesting hallucinated package names that attackers pre-register as malicious dependencies."
pubDate: 2026-07-26
storyOfTheDay: false
---

A new wave of AI supply-chain attacks collectively dubbed "slopsquatting" (also called Phantom Domains and HalluSquatting) has been documented by security researchers, with OpenClaw explicitly named among the affected platforms.

The attack works because AI coding agents reliably hallucinate predictable package names, dependency versions, or domain names during autonomous workflows. Attackers pre-register those hallucinated names as malicious packages or domains. When an agent (or a developer copying its suggestions) installs the package or visits the domain, the attack succeeds.

Researchers demonstrated the technique against OpenClaw's skill ecosystem — specifically its ClawHub plugin marketplace — showing that a carefully prompted OpenClaw agent could be guided into requesting a malicious skill or dependency.

Key mitigations recommended:

- **Review all package names** before installing, even those suggested by an AI
- **Use VirusTotal scanning**, which OpenClaw has integrated for ClawHub skills
- **Keep OpenClaw updated** — versions before 2026.5.28 also had a separate dotenv credential exposure
- **Limit skill/plugin permissions** to the minimum required

SecurityWeek also reported a separate researcher demonstration showing an OpenClaw agent integrated with WhatsApp could be driven to remote code execution, underscoring the risks of broad messaging-channel integrations.

**Source:** [BleepingComputer](https://www.bleepingcomputer.com/news/security/slopsquatting-phantom-domains-and-hallusquatting-are-the-same-ai-attack/amp/), [SecurityWeek](https://www.securityweek.com/in-other-news-iran-tracks-us-military-phones-crashstealer-macos-malware-cvd-blueprint/), [The Claw Report](https://www.theclawreport.com/)
