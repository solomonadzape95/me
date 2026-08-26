---
published: true
name: envelope
description: a cli for encrypting and sharing environment secrets without leaving the terminal.
thumbnail: ascii-art-text.png
logo: logo.svg
images: [ascii-art-text.png, Screenshot_From_2025-10-03_15-34-09.png, Screenshot_From_2025-10-03_15-35-21.png]
stack: [commander, typescript, chalk, node.js]
github: github.com/solomonadzape95/envelope.git
website: https://www.npmjs.com/package/envelope-cli
date: 2025-09-16
status: shipped
---
## why i built it

i kept switching operating systems and collaborating on projects where moving environment secrets was awkward. i wanted a terminal-first way to share them without pasting values into chat or opening another service.

## how it works

envelope combines symmetric and asymmetric cryptography. it encrypts the secrets and their key separately, then packages the encrypted files so they can travel with the codebase without exposing the original values.

## built with

node.js, typescript, commander, and chalk.
