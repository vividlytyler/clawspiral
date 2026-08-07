---
title: "OpenClaw v2026.7.2 Brings Native llama.cpp and Local Inference Support"
description: "Guided setup in OpenClaw now detects local inference providers, includes an in-process llama.cpp GGUF path with RAM gating, and supports Baseten Model API for self-hosted models."
pubDate: 2026-08-07
storyOfTheDay: false
---

OpenClaw v2026.7.2 introduces first-class **local inference** support, making it practical to run AI models entirely on your own hardware without relying on cloud API providers.

## llama.cpp In-Process Inference

The release adds an **in-process llama.cpp GGUF inference** path that is RAM-gated — meaning the model is loaded and run directly within OpenClaw's process, subject to available memory constraints. This enables entirely offline operation for supported GGUF-format models.

## Guided Setup

The onboarding experience now includes **local-provider detection** that automatically identifies available local inference backends during setup. Users can:

- Select from detected local providers
- Choose a strongest-model option from locally available models
- Download models directly from the web or macOS setup flow
- Enable **lean mode** for resource-constrained environments

## Baseten Model API

In addition to llama.cpp, OpenClaw adds **Baseten Model API** support, enabling connection to self-hosted models deployed on Baseten's infrastructure.

## Provider Catalog Discovery

Models are now dynamically discovered from **live provider catalogs**, so available model lists stay current without requiring a restart or manual refresh.

---

See the [OpenClaw releases page](https://github.com/openclaw/openclaw/releases) for the full changelog.
