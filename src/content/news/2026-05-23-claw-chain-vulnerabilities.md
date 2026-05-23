---
title: "Critical \"Claw Chain\" Vulnerabilities Expose 245,000 OpenClaw Servers"
description: "Cyera research identifies four chained CVEs in OpenClaw allowing credential theft, privilege escalation, and backdoor placement across an estimated 245,000 public instances. All four vulnerabilities have been patched."
pubDate: 2026-05-23
storyOfTheDay: true
---

Cyera's security research team has disclosed a chain of four critical vulnerabilities in OpenClaw — collectively dubbed "Claw Chain" — that left approximately 245,000 publicly accessible server instances exposed to remote exploitation.

The four vulnerabilities, discovered and responsibly disclosed to OpenClaw maintainers in April 2026, allow a determined attacker who gains any foothold inside the OpenShell sandbox to escalate privileges, harvest credentials, and plant persistent backdoors:

- **CVE-2026-44112** (CVSS 9.6 – Critical): A TOCTOU race condition in OpenShell allows redirecting write operations outside the sandbox boundary, enabling configuration tampering and backdoor placement.
- **CVE-2026-44115** (CVSS 8.8 – High): A gap between OpenClaw's command validation and shell execution lets environment variables — including API keys and tokens — leak through unquoted heredocs.
- **CVE-2026-44118** (CVSS 7.8 – High): OpenClaw blindly trusts a client-controlled `senderIsOwner` flag without cross-referencing authenticated sessions, allowing local bearer-token processes to escalate to owner-level control.
- **CVE-2026-44113** (CVSS 7.7 – High): A matching TOCTOU pattern in read operations lets attackers swap validated file paths with symlinks pointing outside the allowed mount root.

All four have been patched. Organizations should apply the April 23, 2026 fixes (GHSA-5h3g-6xhh-rg6p, GHSA-wppj-c6mr-83jj, GHSA-r6xh-pqhr-v4xh, and GHSA-x3h8-jrgh-p8jx), rotate all secrets reachable by OpenClaw processes, and audit exposed instances.