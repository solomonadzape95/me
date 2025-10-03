---
published: true
name: envelope
description: a cli tool for securely sharing env secrets with cryptography
thumbnail: ascii-art-text.png
images: [ascii-art-text.png, Screenshot_From_2025-10-03_15-34-09.png, Screenshot_From_2025-10-03_15-35-21.png]
github: github.com/solomonadzape95/envelope.git
website: https://www.npmjs.com/package/envelope-cli
date: 2025-09-16
---
## stack
commander, typescript, chalk, nodejs
## inspo
while dual-booting, i had to make some changes to a codebase i created in the other os, and sadly i had to go back to it and get them. also at the same time i was collaborating on a project and had to get the env secrets and this was causing a fuss so i thought there'd be some way to fix it and on doing some research, just felt like building mine :)
## idea
the idea was to create a cli tool that can help solve my problems and help teams and individuals move their env secrets securely. something that would be easy to use and not require going to your browser in the best case scenario
## implementation
it uses a combo of asymmetric and symmetric cryptography to lock secrets, lock the keys and share them as encrypted files in the codebase.
