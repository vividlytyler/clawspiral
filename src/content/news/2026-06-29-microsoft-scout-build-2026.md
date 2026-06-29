---
title: "Microsoft Scout Brings OpenClaw to Enterprise at Build 2026"
description: "Microsoft unveiled Scout, an always-on autonomous agent built directly on the OpenClaw framework, marking one of the most significant enterprise adoptions of the open-source AI agent runtime."
pubDate: 2026-06-29
storyOfTheDay: true
---

Microsoft announced **Microsoft Scout** at Build 2026, an always-on autonomous agent built on the open-source [OpenClaw](https://openclaw.ai/) framework. Scout represents a new category Microsoft calls "Autopilots" — agents that work continuously on a user's behalf with their own identity, handling complex multi-step tasks without prompting each time.

Scout can execute privileged local operations: reading and writing files, running shell scripts, applying code patches, spawning parallel sub-agents, and automating browser sessions. It integrates with Microsoft's Work IQ system and supports the Model Context Protocol (MCP), allowing developers to extend its access to local resources and third-party tools.

The announcement highlights OpenClaw's momentum as enterprise infrastructure. The framework, originally created by Peter Steinberger (who recently joined OpenAI), is now powering a major Microsoft product — a notable signal that open-source agent frameworks have crossed the threshold from developer hobby projects to production enterprise tooling.

Some security researchers have raised concerns following publicized incidents like the 500-message spam loop bug, but Microsoft and OpenClaw's teams have emphasized ongoing work around exec guardrails, auto-approval policies, and third-party skill vetting — including the recent NVIDIA SkillSpector collaboration.
