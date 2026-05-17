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
## stack
next.js 14, wagmi, viem, prisma, postgres/supabase, neynar (farcaster), erc20 transactions on celo, minipay-ready

## about
flipit is a small on-chain game. players pay a cusd entry fee, can buy power-ups during play, and compete for a daily leaderboard payout. a vercel cron settles the day's leaderboard and disburses to the winning wallets.

## notes
deployed only for testing so far — keep an eye on the cron job and the entry-fee contract balance before publishing.
