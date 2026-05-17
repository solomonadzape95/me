---
published: true
name: aria
description: a chrome extension that adds an ambient voice layer to the browser — tab briefs, page discussion, and focus-guard alerts powered by elevenlabs.
logo: logo.png
thumbnail: thumb.png
images: [shot-1.png, shot-2.png, shot-3.png, shot-4.png, shot-5.png]
stack: [plasmo, elevenlabs, zustand, chrome ext]
github: github.com/solomonadzape95/aria
website: aria-extension.vercel.app
date: 2026-02-01
status: shipped
---
## stack
plasmo, react 18, typescript, elevenlabs conversational ai sdk, elevenlabs tts api, zustand, hacker news + openweathermap apis

## about
aria is a voice-first sidekick for browser deep work. it briefs you on a new tab, holds a quick conversation about the page, and nags you when you slip out of focus. the design context is "playful, bold, irreverent" — sidekick energy, not corporate assistant.

## notes
distributed as an unpacked chrome extension during development. the conversational SDK negotiates a webRTC session per tab.
