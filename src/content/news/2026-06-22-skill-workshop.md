---
title: "Skill Workshop Brings Human-in-the-Loop to OpenClaw's New Skill Creation Flow"
description: "OpenClaw's new Skill Workshop feature introduces a proposal-first workflow for creating reusable agent skills, putting a review step before any skill write goes live — preventing bad habits from becoming permanent agent behavior."
pubDate: 2026-06-22
storyOfTheDay: false
---

A useful agent should learn from repeated work — but skill creation that changes future behavior permanently needs a safety net. OpenClaw's new **Skill Workshop** feature, announced June 3, introduces a proposal-first workflow for building reusable skills.

When an agent creates or revises a skill through Skill Workshop, it starts as a **proposal** — not a live skill file. The proposal carries the draft instruction, support files, review state, and everything needed to apply or reject it cleanly. While pending, the file is `PROPOSAL.md`, not `SKILL.md`, so the agent does not act on it yet.

The loop mirrors normal collaboration: you ask the agent to make a workflow reusable, it drafts a proposal, you refine it with feedback, and then you approve it for use. The Control UI board view surfaces all pending, applied, rejected, and stale proposals in one place, with search, preview, and change-diff tools.

The distinction matters because skills are not just documentation — they change how the agent behaves on future runs. A bad answer can be ignored; a bad skill propagates into every future invocation. Skill Workshop puts the human in control before that happens.
