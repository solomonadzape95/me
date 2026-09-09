---
published: true
name: gauntlet — draft2own
description: a fantasy-stock game where players draft a virtual lineup, battle friends, and can own a small real version on Base.
logo: logo.png
thumbnail: thumb.jpg
images: [shot-1.jpg, shot-2.jpg, shot-3.jpg, shot-4.jpg, shot-5.jpg]
stack: [next.js, typescript, base, viem, chainlink, 0x, supabase]
github: github.com/solomonadzape95/gauntlet-base
date: 2026-09-09
status: in-progress
---
## problem
Tokenized stocks are live onchain, but buying one is not much of a game and a wallet connection alone does not create a reason to return. This edition of Gauntlet starts with a familiar fantasy draft, then connects that lineup to social competition and optional ownership.

## my role
I designed and built the end-to-end product: the live-market draft, persistent teams and transfer rules, player profiles, timed challenges, Game Weeks, leagues, the guided Base purchase flow, and a public impact dashboard.

## decisions
- Players can draft and battle with virtual funds before connecting a wallet or risking money.
- Battles use Base Chainlink total-return feeds and immutable opening snapshots so both lineups are scored from the same market window.
- Optional ownership uses fresh 0x quotes to buy Coinbase tokenized stocks with USDC; the resulting assets stay in the player’s wallet.
- The impact dashboard remains empty until purchases and balances are independently verified onchain.

## evidence
- Automated tests cover draft eligibility, battle scoring and lifecycle, purchase recovery, wallet authentication, transfers, Game Weeks, and leagues.
- The interface includes durable friend challenges, public team pages, scheduled leaderboards, and five-minute Quick Leagues for live demonstrations.
- Purchase state records approvals, receipts, and post-purchase balances, with BaseScan links for independent verification.

## limitations
Gauntlet is in release hardening. Live two-account validation, mainnet purchase testing, production scheduling, legal disclosures, and verified adoption indexing remain before it should be treated as a production product.
