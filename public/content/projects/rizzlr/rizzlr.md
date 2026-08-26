---
published: true
name: rizzlr
description: a voice-first dating game with an ai host and optional solana stakes for player challenges.
logo: logo.svg
thumbnail: thumb.png
images: [shot-1.png, shot-2.png, shot-3.png, shot-4.png, shot-5.png]
stack: [next.js, elevenlabs, solana, anchor, supabase]
github: github.com/SimpleX-T/rizzlr
website: rizzlr.xyz
date: 2026-01-01
status: in-progress
---
## overview

rizzlr is a voice-first dating game built with simplex-t. players take part in spoken rounds with an ai host, then can challenge each other with an optional sol stake.

## how it works

elevenlabs runs the voice session, supabase stores profiles and rounds, and solana wallet adapter handles sign-in. the anchor contract only holds the challenge stake; the game remains the main experience.
