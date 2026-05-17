---
published: true
name: lexis
description: an autonomous i18n agent — paste a next.js repo url, choose target languages, get a pull request with strings extracted and translated.
logo: logo.svg
thumbnail: thumb.png
images: [shot-1.png, shot-2.png]
stack: [next.js, gemini, supabase, octokit, playwright, babel]
github: github.com/solomonadzape95/lexis
website: lexis-ashen.vercel.app
date: 2026-02-15
status: shipped
---
## stack
next.js 14, gemini api, supabase (postgres), babel (string extraction), octokit (pr creation), simple-git, playwright (for crawling), tailwind

## about
lexis takes a next.js repository and produces a pull request that internationalises it. babel walks the AST to extract user-facing strings, gemini handles translation per language, octokit opens the PR on the original repo. the goal is to remove the worst part of localising a codebase — the boilerplate — without taking design decisions away from the maintainer.

## notes
runs on render.com. the slow path is the LLM translation step; everything else is sub-second.
