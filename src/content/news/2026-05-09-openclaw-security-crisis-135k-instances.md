---
title: "OpenClaw Security Crisis Deepens: 820+ Malicious Skills, 135K Exposed Instances, 9 CVEs"
description: "A comprehensive enterprise security analysis details how OpenClaw's rapid growth to 368k GitHub stars has outpaced its security maturity. Researchers confirm over 820 malicious skills on ClawHub (20% of the registry), multiple critical CVEs including one-click RCE, and 135,000+ exposed instances worldwide."
pubDate: 2026-05-09
storyOfTheDay: false
---

OpenClaw, the open-source AI agent that crossed 368,000 GitHub stars and 12 million downloads in roughly three months, is facing the most significant security crisis in the AI agent ecosystem to date. A comprehensive analysis published this week compiles findings from multiple independent cybersecurity research teams and paints a sobering picture of a platform whose speed of adoption far outpaced its security maturity.

## The Numbers

- **820+** confirmed malicious skills on ClawHub (~20% of the registry)
- **135,000+** OpenClaw instances estimated to be exposed to the public internet
- **9** CVEs disclosed since January 2026
- **135,000+** instances running without authentication, bound to all network interfaces

## The Malicious Skills Epidemic

The most immediate threat isn't a bug in the core platform — it's the skills ecosystem. In late January 2026, Koi Security researcher Oyn Yomtov audited all 2,857 skills on ClawHub and found 341 malicious entries attributed to a single coordinated campaign: **ClawHavoc**. These skills masqueraded as high-demand productivity tools and distributed the Atomic macOS Stealer (AMOS), exfiltrating files, crypto wallets, Keychain data, browser passwords, and cloud credentials.

The registry has since grown from 2,857 to over 10,700 skills, with malicious entries rising proportionally. Bitdefender estimates approximately 900; Antiy CERT reports 1,184. Attack patterns mirror npm and PyPI supply chain attacks: typosquatting, manufactured popularity metrics, and gamed reviews.

## Critical Vulnerabilities

Nine CVEs have been disclosed since January 2026. The most severe:

- **CVE-2026-25253 (CVSS 8.8)** — One-click RCE via cross-site WebSocket hijacking. If the agent visits an attacker-controlled website, the authentication token is leaked and full administrative control is gained. Patched in version 2026.1.29.
- **CVE-2026-24763** — Docker sandbox bypass, discovered even after the RCE fix. Patched in version 2026.1.30.
- **CVE-2026-25157** — Command injection combined with default insecure configuration (no auth, binding to all interfaces) created a trivially exploitable attack chain.

## Enterprise Response

Cisco described OpenClaw from a security perspective as *"an absolute nightmare."* Microsoft published deployment guidance. Kaspersky documented 512 vulnerabilities in their initial audit. SecurityScorecard and Bitsight independently confirmed the scale of exposed instances worldwide.

A hardened enterprise fork — **NemoClaw**, integrated with NVIDIA NeMo guardrails and OpenShell sandboxes — has emerged as a recommended alternative for risk-averse buyers. NVIDIA CEO Jensen Huang positioned OpenClaw as *"the next ChatGPT"* at GTC 2026, while simultaneously announcing NemoClaw for enterprise security hardening.

## The Path Forward

Security researchers and enterprise advisors are now treating skills like mobile apps — assume none are trustworthy until audited. The OpenClaw team has shipped multiple patches and introduced lazy-load TypeScript from plugin test-contract runtimes, but the underlying challenge remains: a registry that grew 4x in months with minimal vetting cannot be cleaned up retroactively without significant community investment.