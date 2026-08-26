---
published: true
name: flipit
description: a memory-card game on celo with cusd entry fees, power-ups, and a daily leaderboard payout.
thumbnail: thumb.png
images: [shot-1.png, shot-2.png, shot-3.png]
stack: [next.js, wagmi, viem, prisma, neynar]
github: github.com/solomonadzape95/flipit
website: https://flipit-kappa.vercel.app/
date: 2025-11-01
status: in-progress
---
## overview

flipit is a small onchain memory game. players enter with cusd, buy power-ups during a round, and compete for the daily leaderboard payout.

## how it works

wallet actions run through wagmi and viem on celo. prisma stores game and leaderboard data, while a scheduled job closes each day and pays the winning wallets.

## current state

the deployment is for testing. the payout job and entry-fee balance still need production safeguards.
