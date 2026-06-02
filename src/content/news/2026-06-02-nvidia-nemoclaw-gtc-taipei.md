---
title: "NVIDIA Brings NemoClaw to OpenClaw at GTC Taipei 2026"
description: "At GTC Taipei, Jensen Huang called OpenClaw 'the new Linux' and announced NemoClaw — an open-source security and sandboxing stack built on NVIDIA OpenShell and Nemotron models, designed to make enterprise OpenClaw deployments safer and more governable."
pubDate: 2026-06-02
storyOfTheDay: true
---

At GTC Taipei on June 1, 2026, NVIDIA announced NemoClaw for the OpenClaw community — a production-ready open-source security layer that adds sandboxing, network policy controls, and local inference options to any OpenClaw installation.

The announcement doubles as one of the highest-profile endorsements the project has received. Jensen Huang referred to OpenClaw as "the new Linux" in his keynote, saying every company needs a strategy for it. That framing reflects how seriously the enterprise world is taking autonomous agent infrastructure — and how concerned it is about the security implications.

## What NemoClaw Actually Does

NemoClaw layers three components on top of a base OpenClaw install:

**NVIDIA OpenShell** is a secure runtime that wraps each agent in an isolated sandbox. Administrators define YAML policies controlling what files the agent can read and write, which outbound network destinations are allowed, and which cloud AI services it can call. The agent cannot override these policies — they are enforced at the runtime level.

**NVIDIA Nemotron models** run locally by default within the sandbox. The practical goal is data isolation: tasks involving proprietary code, internal documents, or customer records stay on local hardware. Nothing leaves the building. Context budget is 250,000 tokens.

**Guided onboarding and lifecycle management** come through a single CLI, with blueprints and audit logging built in.

## Why It Matters

Even a fully patched OpenClaw installation has unanswered governance questions for enterprise IT: which files can the agent access, whether queries to hosted models send private data outside the network, and what audit trail exists for agent actions. NemoClaw does not fix OpenClaw's CVE count — the project had 454 documented CVEs as of late April — but it provides the policy enforcement and network isolation layer that enterprise security teams require.

The timing reflects the tension NVIDIA is trying to resolve: OpenClaw is undeniably the most-starred open-source project in GitHub history (347K+ stars as of May 2026), but its security reputation has been battered by CVEs and a ClawHub marketplace riddled with malicious skills. NemoClaw is NVIDIA's answer to the question every enterprise CISO is asking: *how do we get the productivity benefits without the risk?*

NemoClaw is available immediately as a public preview on [GitHub](https://github.com/NVIDIA/NemoClaw). General availability is planned for Q3 2026.