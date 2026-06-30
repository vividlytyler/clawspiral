---
title: "Skill Workshop: A Review Step Before Agent Skills Go Live"
description: "OpenClaw's new Skill Workshop feature lets agents draft reusable skills as proposals, giving users a review-and-revision loop before any skill changes future agent behavior."
pubDate: 2026-06-30
storyOfTheDay: false
---

OpenClaw has shipped **Skill Workshop**, a structured feature for creating and refining reusable agent skills with a human review step built in before anything goes live.

Skills in OpenClaw are how agents learn reusable procedures — invoice follow-up checklists, release routines with validation steps, repo health workflows with scripts and templates. But unlike a normal file edit, a skill doesn't just answer one question: it changes how future work is done. A bad skill can quietly corrupt every subsequent run.

Skill Workshop addresses this by inserting a proposal layer between the agent's draft and live skill execution:

**Proposal First** — When an agent creates or revises a skill through Skill Workshop, it starts as `PROPOSAL.md`, not `SKILL.md`. The proposal carries the draft instruction, support files, review state, and everything needed to apply or reject it cleanly. It doesn't run yet.

**Shape It Before You Keep It** — The Control UI surfaces proposed skills as reviewable work in Board view (full workshop with pending/applied/rejected/stale states) and Today view (one-at-a-time fast pass with a concrete approve/edit/skip decision).

**Tweak Is Where It Matters** — Generated skills are often almost right. Skill Workshop turns "close but not quite" into a revision conversation: adjust the wording, add a safer fallback, convert a script to a template. The proposal is the object being edited, history intact.

Skills can also carry support files — response templates, example logs, deployment scripts — which are reviewed alongside the main instruction file.

Skill Workshop is available now via the OpenClaw Control UI and CLI (`openclaw skills`).
