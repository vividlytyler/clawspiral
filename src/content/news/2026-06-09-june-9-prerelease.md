---
title: "OpenClaw June 9 Pre-Release: SQLite Auth, Parallel Search, and MCP Hardening"
description: "The June 9 pre-release brings SQLite-backed auth profiles, a new bundled Parallel web search provider, MCP tool result coercion to prevent session poisoning, and a full pass on agent loop strictness — plus the switch to YYYY.M.PATCH monthly versioning."
pubDate: 2026-06-09
storyOfTheDay: true
---

OpenClaw shipped a substantial pre-release on June 9, touching quality-of-life fixes across auth, messaging, search, and platform stability. Here's what matters.

## Auth Profiles Now in SQLite

The most infrastructure-heavy change: auth profiles — the credentials and session state backing channels and integrations — have moved from JSON files to SQLite. The benefit is durability: SQLite handles concurrent writes and process restarts more gracefully than flat JSON, meaning auth state is less likely to get corrupted or race-corrupted after a crash or upgrade. Official npm plugin install records also keep their trusted pins intact, and prerelease fallback integrity checks no longer carry stale state forward.

## Parallel Search Is Now a First-Class Provider

Parallel joined the bundled web search providers roster, with `PARALLEL_API_KEY` discovery, guarded endpoint handling, cache-safe session IDs, onboarding picker support, and documentation. If you've been using a custom search provider config, this may be a cleaner option going forward.

## MCP Tool Results: No More Session Poisoning

MCP (Model Context Protocol) tool results now coerce `resource_link`, `resource`, `audio`, malformed image, and future non-text/image blocks at the materialize boundary. Previously, if an MCP tool returned richer content than expected — say, a file link or audio block — it could trigger Anthropic 400 errors and poison the session history with malformed entries. This fix sanitizes those edge cases before they reach the model.

## Anthropic Extended-Thinking Sessions Recover Properly

Extended-thinking sessions (where the model does multi-step reasoning before responding) now recover cleanly after prompt-cache expiry or a Gateway restart. Stream start events now wait for `message_start`, letting pre-generation signature errors trigger the existing recovery retry instead of silently failing. If you've been seeing truncated or dropped responses on long reasoning chains, this should address it.

## Stricter Agent, Tool, and Provider Loops

A broad pass tightened the loops around MCP lease timestamps, prompt-cache tool names, local tool catalogs, unreadable dynamic tools, owner-only HTTP tools, and provider catalog metadata. The goal: reduce hidden retries and unsafe exposure. This is the kind of change that prevents surprise behavior in production deployments with many concurrent agent turns.

## macOS Node Mode Fix

On macOS, node mode no longer silently self-reconnects away from a healthy direct Gateway session. This was causing unexpected companion app session churn — the macOS app would appear connected while silently migrating to a different session backend.

## Versioning Switch: YYYY.M.PATCH

The release train switched to monthly `YYYY.M.PATCH` versioning (e.g., this release is part of the `2026.6` train). Pre-transition tags remain compatible. The June floor is pinned at `2026.6.5` after the published beta.

---

Full changelog with all PR credits on [GitHub](https://github.com/openclaw/openclaw/releases).
