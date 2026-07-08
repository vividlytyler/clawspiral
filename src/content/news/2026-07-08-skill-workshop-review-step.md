---
title: "OpenClaw Launches Skill Workshop: Turn Agent Work Into Reviewed Reusable Skills"
description: "A new Skill Workshop feature in OpenClaw introduces a proposal-and-review workflow for creating skills, preventing accidental live changes to agent behavior."
pubDate: 2026-07-08
storyOfTheDay: false
---

OpenClaw has shipped **Skill Workshop**, a structured workflow for converting agent-generated work into reusable skills — with a mandatory review step before any skill goes live.

## The Problem Skill Workshop Solves

Skills in OpenClaw are reusable procedures that change how agents behave going forward. Unlike a one-off answer, a skill写入 can shape every future run. That makes careless skill creation a bigger risk than bad individual outputs — one bad skill can quietly corrupt future work.

Previously, agents could write skills directly, meaning a mistake in drafting could immediately become part of the agent's operating procedure.

## How It Works

Skill Workshop introduces a **proposal-first** workflow:

1. Agent drafts a skill → saved as `PROPOSAL.md`, not yet active
2. User reviews the draft in the Control UI (board view shows pending, applied, rejected, and stale proposals)
3. User requests changes or approves
4. Only on approval does the skill become live as `SKILL.md`

The Control UI treats proposed skills as reviewable work with full diff visibility, support file previews, and search — not hidden files to hunt down manually.

## Why It Matters

This is a meaningful UX safeguard for any team using OpenClaw agents in shared or semi-autonomous roles. The review step means users stay in control of what the agent teaches itself, without needing to manually audit skill files after the fact.

Skill Workshop is available now. See the [OpenClaw docs](https://docs.openclaw.ai/tools/skill-workshop) for details.
