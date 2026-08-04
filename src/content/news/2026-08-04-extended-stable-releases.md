---
title: "OpenClaw Introduces Extended-Stable Release Channel and Public Maturity Scorecard"
description: "A new long-lived release track backed by monthly patches and a public scorecard helps users choose OpenClaw features for critical workloads with more confidence."
pubDate: 2026-08-04
storyOfTheDay: false
---

OpenClaw is introducing two new mechanisms to make production use more predictable: extended-stable releases and a public maturity scorecard. Both are aimed at the growing number of individuals and organizations relying on OpenClaw for genuinely critical workloads.

**Extended-Stable Releases**

The new `extended-stable` release channel offers long-lived OpenClaw builds with backported security and reliability fixes. Releases roll out monthly, following the `YYYY.M.33` versioning scheme. The first extended-stable release is [OpenClaw 2026.6.33](https://github.com/openclaw/openclaw/releases/tag/v2026.6.33), based on OpenClaw 2026.6.11. Each monthly line receives backported fixes that increment the patch version.

Install with:
```bash
npm install -g openclaw@extended-stable
# or switch an existing install:
openclaw update --channel extended-stable
```

Each extended-stable release is supported until the next one ships, with a minimum support window of one month. This moves OpenClaw closer to a formal LTS offering purpose-built for the agentic era.

**The Maturity Scorecard**

Alongside the new release channel, OpenClaw published a [public maturity scorecard](https://docs.openclaw.ai/maturity/scorecard) — a full inventory of features organized by surface area and category, with a calculated maturity rating for each.

Maturity is derived from a combination of outstanding GitHub issues, comparisons with similar services, and human judgment. Mature features receive dedicated issue labels, prioritized maintainer attention, and real end-to-end tests exercising them in production. The stated goal is maintaining more than 90% end-to-end test coverage for all stable features.

**What This Means for Users**

These changes reflect OpenClaw's maturation from an early-adopter tool into infrastructure. The extended-stable channel gives operators a safer upgrade path for fixed-function deployments, while the scorecard makes it clearer which features are production-ready and which are still evolving. Both are steps toward making OpenClaw viable for hardened enterprise use cases.
