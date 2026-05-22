---
title: "OpenClaw Chain Vulnerabilities Exposed 245,000 Public Servers"
description: "Cyera discovered four critical vulnerabilities in OpenClaw affecting an estimated 245,000 publicly accessible instances, including TOCTOU race conditions and credential leakage through unquoted heredocs. All CVEs have been patched."
pubDate: 2026-05-22
storyOfTheDay: true
---

A research team at [Cyera discovered a chain of four critical vulnerabilities](https://cybersecuritynews.com/openclaw-chain-vulnerabilities/) in OpenClaw that left an estimated 245,000 publicly accessible server instances exposed to remote exploitation, credential theft, and persistent backdoor installation.

The four CVEs, disclosed to OpenClaw maintainers in April 2026, have all been patched:

- **CVE-2026-44112** (CVSS 9.6 – Critical): A time-of-check/time-of-use (TOCTOU) race condition in the OpenShell sandbox allows attackers to redirect write operations outside the sandbox boundary, enabling configuration tampering and persistent backdoor placement.

- **CVE-2026-44115** (CVSS 8.8 – High): A gap between command validation and shell execution allows environment variables—including API keys, tokens, and credentials—to leak through unquoted heredocs that appear safe at validation time.

- **CVE-2026-44118** (CVSS 7.8 – High): OpenClaw trusts a client-controlled `senderIsOwner` flag without cross-referencing the authenticated session, allowing local process escalation to owner-level control over gateway configuration and scheduling.

- **CVE-2026-44113** (CVSS 7.7 – High): The same TOCTOU pattern in read operations lets attackers swap validated file paths with symlinks pointing outside the allowed mount root, exposing system files the agent was never meant to access.

Originally launched as "Clawdbot" in late 2025, OpenClaw connects LLMs directly to filesystems, SaaS applications, credentials, and execution environments. Enterprises have rapidly adopted it for IT automation, customer service pipelines, and integrations with Telegram, Discord, and Microsoft Agent 365—broad, privileged access that makes it a high-value target.

If you're running a publicly accessible OpenClaw instance, ensure you're on the latest patched version.