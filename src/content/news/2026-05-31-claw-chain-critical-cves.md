---
title: "Claw Chain: Four Critical CVEs Exposed 245,000 OpenClaw Servers"
description: "Cyera discovered a chain of four critical vulnerabilities in OpenClaw affecting an estimated 245,000 public instances, including a CVSS 9.6 sandbox escape. All four CVEs have been patched since April disclosure."
pubDate: 2026-05-31
storyOfTheDay: true
---

Security firm Cyera has disclosed a chain of four critical vulnerabilities in OpenClaw — one of the fastest-growing open-source AI agent frameworks — leaving approximately 245,000 publicly accessible server instances exposed to remote exploitation, credential theft, and persistent backdoor installation.

## The Vulnerabilities

All four were reported to OpenClaw maintainers in April 2026 and have since been patched:

| CVE | CVSS | Issue |
|-----|------|-------|
| CVE-2026-44112 | **9.6 (Critical)** | TOCTOU race condition in OpenShell sandbox allows write operations to escape containment, enabling configuration tampering and backdoor placement |
| CVE-2026-44115 | **8.8 (High)** | Gap between command validation and shell execution leaks environment variables — including API keys and tokens — through unquoted heredocs |
| CVE-2026-44118 | **7.8 (High)** | OpenClaw trusts a client-controlled `senderIsOwner` flag without cross-referencing the authenticated session, allowing token-holders to escalate to owner-level gateway control |
| CVE-2026-44113 | **7.7 (High)** | Same TOCTOU pattern in read operations exposes system files via symlink swaps after validation |

## Why This Matters

The vulnerabilities are especially dangerous because OpenClaw agents connect LLMs directly to filesystems, SaaS credentials, and execution environments. Chaining them together, an attacker could escape the sandbox, establish persistence, and pivot using leaked credentials — all remotely.

The exposure window was from discovery (reported April 2026) through patching. OpenClaw maintainers acted quickly, but the large number of public instances with delayed update cycles means some may still be unpatched.

## The Bigger Picture

Originally launched as "Clawdbot" in late 2025, OpenClaw has seen explosive enterprise adoption for IT automation, customer service pipelines, and integrations with Telegram, Discord, and Microsoft Agent 365. That breadth of privileged access makes it a high-value target.

This disclosure lands alongside NVIDIA's NemoClaw (a hardened fork with NeMo guardrails), Tencent committing full-time maintainers, and the repository crossing 368,000 GitHub stars — underscoring that OpenClaw is no longer a niche project but a production platform with a growing target on its back.

Enterprise teams should verify their deployments are running the latest patched version.

📝 [Read full details at Cybersecurity News](https://cybersecuritynews.com/openclaw-chain-vulnerabilities/)
