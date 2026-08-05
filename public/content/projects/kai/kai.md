---
published: true
name: kai
description: a local-first desktop assistant with on-device inference, reminders, voice notes, connected services, and governed tool use.
logo: logo.png
thumbnail: thumb.webp
images: [shot-1.webp, shot-2.webp, shot-3.webp, shot-4.webp, shot-5.webp, shot-6.webp, shot-7.webp, shot-8.webp]
stack: [tauri, rust, react, typescript, llama.cpp, postgresql]
github: github.com/solomonadzape95/kai
website: https://kai.thesolenoid.space
date: 2026-08-02
status: in-progress
---
## problem
Most assistants depend on a cloud account and treat tool access as an invisible capability. Kai explores a different model: local conversation and inference by default, with networked models and account-connected services introduced as explicit, optional boundaries.

## my role
I designed and built the desktop experience, native Tauri bridge, local model lifecycle, reminders, voice-note flow, approval states, and cross-platform release process. I also built the supporting website, device authorisation flow, and optional gateway for connected services.

## decisions
- Rust owns the agent loop and verifies real tool results before the interface claims an action succeeded.
- Sensitive actions pass through confirmation gates instead of allowing a model to act silently.
- Local chat, reminders, and preferences work without an account; hosted inference and connected services remain optional and visibly distinct.
- Installers are produced for macOS, Windows, and Linux through one automated release workflow.

## evidence
- Public cross-platform installers and versioned GitHub releases.
- Separate desktop, web, Rust, and packaging verification suites run in CI.
- Architecture and installation documentation describe the model runtime, tool registry, cloud boundary, and current operating-system warnings.

## limitations
Kai is an early build. macOS and Windows packages are not yet backed by production distribution certificates, automatic updates are not enabled, and connected services still require careful deployment and consent configuration.
