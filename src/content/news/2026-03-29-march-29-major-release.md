---
title: "OpenClaw March 29 Release: MiniMax Image Gen, xAI Responses API, Async Plugin Approvals"
description: "The latest OpenClaw release adds MiniMax image generation, migrates xAI to the Responses API with native x_search, enables async plugin approval hooks, and enables apply_patch by default for OpenAI models."
pubDate: 2026-03-29
storyOfTheDay: true
---

The OpenClaw team shipped a packed minor release overnight, touching providers, plugins, security workflows, and CLI tooling in one sweep.

## Headline Features

**MiniMax Image Generation** — OpenClaw now ships a bundled image generation provider for MiniMax's `image-01` model, supporting both generate and image-to-image editing with aspect ratio control. The model catalog has also been trimmed to M2.7 only, dropping legacy M2, M2.1, M2.5, and VL-01 models.

**xAI Responses API + x_search** — The bundled Grok provider moves to xAI's Responses API, gains first-class `x_search` support, and auto-enables the xAI web search plugin from existing config — no manual toggling required. Onboarding flows have been updated to offer x_search setup during `openclaw onboard` and `openclaw configure --section web`.

**Async Plugin Approval Hooks** — A significant new plugin capability: `requireApproval` can now be added to `before_tool_call` hooks, letting plugins pause tool execution and prompt the user for approval. This works across the exec approval overlay, Telegram buttons, Discord interactions, and the `/approve` command on any channel. The `/approve` command has been unified to handle both exec and plugin approvals.

**apply_patch Enabled by Default for OpenAI** — OpenAI and OpenAI Codex models now have `apply_patch` enabled by default, with sandbox policy access aligned to write permissions.

## Other Notable Changes

- **ACP current-conversation binds:** Discord, BlueBubbles, and iMessage now support `/acp spawn codex --bind here` to turn the current chat into a Codex-backed workspace without creating a child thread.
- **CLI backends expand:** Gemini CLI joins Claude CLI and Codex CLI as a bundled inference backend; `gateway run --claude-cli-logs` is replaced with the generic `--cli-backend-logs`.
- **Podman improvements:** Container setup simplified for rootless users; the launch helper now installs to `~/.local/bin`.
- **Matrix TTS:** Auto-TTS replies now send as native Matrix voice bubbles instead of audio attachments.
- **Slack explicit file uploads:** A new `upload-file` action routes uploads through Slack's native upload transport with optional filename/title/comment overrides.
- **Config cleanup:** Legacy speech config auto-migrates on read; old bundled TTS API key shapes no longer fall back in normal mode. Config migrations older than two months are now dropped automatically.
- **Qwen provider deprecated:** The `portal.qwen.ai` OAuth integration is removed; users must migrate to Model Studio with `--auth-choice modelstudio-api-key`.

## Fixes

- Agents/Anthropic: unhandled provider stop reasons (e.g. `sensitive`) now return as structured assistant errors instead of crashing the agent run.
- Google/Gemini 3.1: `pro`, `flash`, and `flash-lite` now resolve correctly across all Google provider aliases.
- OpenAI Codex image tools: image analysis no longer fails on missing provider registration.
- WhatsApp: fixed an infinite echo loop in self-chat DM mode.

---

Full changelog: [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw/releases)
