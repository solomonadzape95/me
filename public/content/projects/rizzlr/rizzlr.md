---
published: true
name: rizzlr
description: a voice-first dating-game ui powered by elevenlabs, with optional solana sol escrow for pvp challenges.
logo: logo.svg
thumbnail: thumb.png
images: [shot-1.png, shot-2.png, shot-3.png, shot-4.png, shot-5.png]
stack: [next.js, elevenlabs, solana, anchor, supabase]
github: github.com/SimpleX-T/rizzlr
website: rizzlr.xyz
date: 2026-01-01
status: in-progress
---
## stack
next.js, react 19, elevenlabs conversational ai (websocket / webrtc), solana web3.js, anchor (escrow program), supabase (profiles + sessions), tailwind, radix

## about
rizzlr is a voice-first dating game. players have spoken rounds against an AI host, with optional pvp challenges backed by a small SOL escrow contract written in anchor. wallet auth is via solana wallet adapter; profiles and sessions live in supabase.

## notes
collaboration with simplex-t. the on-chain piece is intentionally small — the game is the experience, the escrow is the stake.
