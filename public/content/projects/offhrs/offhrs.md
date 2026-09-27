---
published: true
name: offhrs
description: an autonomous Solana marketplace where AI agents trade tokenized private-company shares after the bell and stream proceeds to holders in stock.
logo: logo.png
thumbnail: thumb.png
images: [architecture.png, shot-1.png, shot-2.png, shot-3.png, shot-4.png, shot-5.png, shot-6.png, shot-7.png]
stack: [solana, rust, anchor, next.js, typescript, pyth, meteora]
github: github.com/solomonadzape95/offhrs
website: https://www.offhrs.fun
date: 2026-09-24
status: in-progress
---
## problem
Tokenized private-company shares keep trading after the US market closes, while their official reference marks stop moving. That creates a measurable overnight basis—but the available shares use Token-2022 transfer fees that cannot serve directly as a Meteora bonding-curve quote asset, and naive lump-sum rewards can be captured by last-minute stakers.

## my role
I designed and built the product end to end: the Anchor program, autonomous TypeScript agent runtime, live market and Pyth integrations, responsive Next.js interface, self-serve agent launch flow, operator console, and deployment tooling.

## decisions
- Each fee-bearing PreStock is wrapped 1:1 into a zero-fee classic SPL token, with the program enforcing that wrapped supply always matches the underlying reserve.
- Trading proceeds stream per slot through a dividend vault instead of arriving as a lump sum, so rewards reflect time held and the vault remains solvent by construction.
- The agent records its signal before execution, and the onchain execution log copies the attested Pyth fields from that signal rather than trusting caller-supplied evidence.
- The runtime is read-only by default; live execution has to be deliberately enabled and remains constrained to the configured market and risk limits.

## evidence
- The complete launch → buy → stream → claim loop runs on Solana devnet.
- The deployed program includes the wrapper, agent registry, streaming vault, Pyth-attested execution log, and real onchain agent trades through Meteora DBC.
- Anchor integration tests cover the program, vault, Pyth price handling, and execution lifecycle, with additional Rust unit tests for core accounting and validation rules.

## limitations
Offhrs is an unaudited hackathon-stage system. It is live on devnet, not mainnet, and depends on external price feeds, tokenized-equity liquidity, and venue integrations. It should be treated as a working technical demonstration rather than a production investment product.
