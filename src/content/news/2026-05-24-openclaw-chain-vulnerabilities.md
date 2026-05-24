---
title: "Four Critical OpenClaw Vulnerabilities Patched, 245,000 Servers Were Exposed"
description: "Cyera discovered a chain of four critical CVEs in OpenClaw — including a TOCTOU race condition and a senderIsOwner bypass — affecting an estimated 245,000 public instances. All have been patched."
pubDate: 2026-05-24
storyOfTheDay: false
---

Cyera's research team disclosed four critical vulnerabilities in OpenClaw (originally "Clawdbot", late 2025) in April 2026. All four have since been patched by maintainers. The chain left approximately 245,000 publicly accessible server instances exposed to remote exploitation, credential theft, and persistent backdoor installation.

**The CVEs:**

- **CVE-2026-44112 (CVSS 9.6 — Critical):** A time-of-check/time-of-use (TOCTOU) race condition in the OpenShell sandbox allows attackers to redirect write operations outside the sandbox boundary, enabling configuration tampering and persistent backdoor placement.

- **CVE-2026-44115 (CVSS 8.8 — High):** A gap between OpenClaw's command validation and shell execution lets environment variables — including API keys and tokens — leak through unquoted heredocs that appear safe at validation time.

- **CVE-2026-44118 (CVSS 7.8 — High):** OpenClaw trusts a client-controlled `senderIsOwner` flag without cross-referencing the authenticated session, allowing a local process with a valid bearer token to escalate to owner-level control over gateway configuration, scheduling, and execution management.

- **CVE-2026-44113 (CVSS 7.7 — High):** The same TOCTOU pattern in read operations lets attackers swap validated file paths with symlinks pointing outside the allowed mount root, exposing system files and internal artifacts.

The broad, privileged access OpenClaw provides — filesystems, SaaS apps, credentials, and execution environments — makes these vulnerabilities particularly high-impact. Enterprise deployments running public-facing OpenClaw instances should verify their deployments are up to date.