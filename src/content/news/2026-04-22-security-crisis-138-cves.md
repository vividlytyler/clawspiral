---
title: "138 CVEs in 5 Months: OpenClaw Security Crisis Deepens as Researchers Recommend 'Assume Compromise'"
description: "A comprehensive security roundup found 138 CVEs tied to OpenClaw since launch, 135,000+ exposed instances across 82 countries, and 12% of ClawHub skills flagged as malicious. Researchers say the only safe posture is to assume your instance is already compromised."
pubDate: 2026-04-22
---

The OpenClaw security situation continues to deteriorate, with researchers now recommending that all users assume their instances have already been compromised.

**The Numbers Are Staggering:**
- **138 CVEs** associated with OpenClaw in its first 5 months of existence
- **7 critical** and **49 high-severity** vulnerabilities documented
- **135,000+ exposed instances** across 82 countries (63% running without authentication)
- **12% of ClawHub skills** flagged as malicious as of February 2026 (341 out of 2,857), with 824+ still active as the "ClawHavoc" campaign
- Minimum safe version now bumped to **OpenClaw ≥ 2026.4.14**

**Key Unfixed Threats Still Active:**
- **CVE-2026-25253** (CVSS 8.8) — one-click RCE via WebSocket; 35.4% of observed deployments still vulnerable
- **CVE-2026-22172** and **CVE-2026-32922** (CVSS 9.9) — admin control without credentials
- **CVE-2026-33579** — pairing-privilege to full admin takeover (fixed in 2026.3.28, but many unpatched)
- **CVE-2026-35639** (CVSS 8.7), **CVE-2026-34511** (OAuth PKCE), **CVE-2026-35636** (sessionId hijacking), **CVE-2026-40037** (cross-origin SSRF) — added in April 2026 patch batch

**What You Should Do:**
1. Update to OpenClaw ≥ 2026.4.14 immediately
2. Enable authentication on all instances (63% are unauthenticated — that's the default to fix)
3. Audit ClawHub skills — remove any from before March 2026
4. Rotate credentials accessible to your OpenClaw instance
5. Treat your environment as potentially compromised already

Microsoft advised against any OpenClaw deployment on workstations containing sensitive data back in February. That advice has only gotten more relevant.

**Source:** [CVEfind — OpenClaw Security: 138 CVEs and Why You Should Assume Compromise](https://www.cvefind.com/en/blog/openclaw-compromise-ai-agents.html)