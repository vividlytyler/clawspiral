---
title: "GitLab Advisory: OpenClaw Path Traversal and Slack Filtering Defects"
description: "GitLab's advisory database (GLAD) updated this week catalogs multiple OpenClaw vulnerabilities — including a path traversal issue in marketplace handling and Slack context filtering problems — with fixed versions listed for teams to verify."
pubDate: 2026-07-18
storyOfTheDay: false
---

GitLab's advisory database (**GLAD**) published an updated entry for OpenClaw this week, cataloguing multiple vulnerabilities alongside their patched versions.

## Vulnerabilities Listed

### Path Traversal in Marketplace Handling

A path traversal flaw in OpenClaw's marketplace (ClawHub) package handling could allow a malicious skill or package to read files outside its intended scope. This is a significant concern given that ClawHub skills run with access to the OpenClaw workspace and can invoke exec-approved tools.

### Slack Context Filtering Issues

Separately, defects in Slack context filtering could allow message content or metadata to leak across channels or into contexts it shouldn't reach — a data isolation problem for multi-channel deployments.

## Fixed Versions

The GLAD entry lists specific fixed versions for each issue. Teams running self-hosted OpenClaw instances should cross-reference their current version against the advisory to determine if an upgrade is needed.

## Broader Security Context

These vulnerabilities follow a busy period for OpenClaw security disclosures:

- **PT-2026-60627** (July 17) — Authentication bypass in exec approval flows, affecting builds 2026.5.14‑beta.1 through 2026.5.27
- This GLAD update (July 16) — Path traversal and Slack filtering defects

The OpenClaw team has been responsive to disclosures, and both the foundation blog and recent release notes emphasize ongoing security hardening. With 4.5 million new claws born every week, the attack surface is getting significant attention from both defenders and researchers.

## More Details

- [GLAD Advisory: npm/Openclaw](https://advisories.gitlab.com/pkg/npm/openclaw/)
