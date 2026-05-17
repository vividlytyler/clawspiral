---
title: "Claw Chain: Four Critical Vulnerabilities Expose 245,000 OpenClaw Servers"
description: "Cyera discovered a chain of four critical vulnerabilities in OpenClaw affecting an estimated 245,000 publicly accessible instances. All four CVEs have been patched, but the disclosure raises serious questions about enterprise security posture."
pubDate: 2026-05-17
storyOfTheDay: true
---

Cyera's research team identified four critical vulnerabilities — collectively dubbed "Claw Chain" — in OpenClaw, one of the fastest-growing open-source platforms for autonomous AI agents.

The vulnerabilities, disclosed to OpenClaw maintainers in April 2026 and now fully patched, left approximately **245,000 publicly accessible server instances** exposed to remote exploitation, credential theft, and persistent backdoor installation.

## The Four CVEs

- **CVE-2026-44112 (CVSS 9.6 – Critical):** A TOCTOU race condition in the OpenShell sandbox allows attackers to redirect write operations outside the sandbox boundary, enabling configuration tampering and backdoor placement.
- **CVE-2026-44115 (CVSS 8.8 – High):** A gap between command validation and shell execution allows environment variables — including API keys and tokens — to leak through unquoted heredocs.
- **CVE-2026-44118 (CVSS 7.8 – High):** OpenClaw trusts a client-controlled `senderIsOwner` flag without cross-referencing the authenticated session, allowing local privilege escalation to owner-level gateway control.
- **CVE-2026-44113 (CVSS 7.7 – High):** A TOCTOU race in read operations lets attackers swap validated file paths with symbolic links, exposing system files outside the allowed mount root.

## Why the Chain Is the Story

From a single foothold — a malicious plugin, prompt injection, or compromised external input — an attacker can chain all four vulnerabilities to:

1. Gain code execution inside the OpenShell sandbox
2. Harvest credentials, secrets, and sensitive files
3. Escalate to owner-level control of the agent runtime
4. Plant backdoors and modify future agent behavior

What makes this especially dangerous: the attacker weaponizes the AI agent's own privileges. Each step mimics normal agent behavior, making detection significantly harder.

## Enterprise Implications

OpenClaw connects LLMs directly to filesystems, SaaS applications, credentials, and execution environments — making it an exceptionally high-value attack target. Enterprises rapidly adopted it for IT automation, customer service pipelines, and integrations with Telegram, Discord, and Microsoft Agent 365.

The v2026.5.4-beta.1 release addresses these issues. Enterprises running earlier versions should update immediately.