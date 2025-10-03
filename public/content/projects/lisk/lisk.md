---
published: true
name: lisk-dashboard
description: a data analysis project for some lisk tokens
thumbnail: Screenshot_From_2025-10-03_15-20-09.png
images: [Screenshot_From_2025-10-03_15-20-09.png, Screenshot_From_2025-10-03_15-20-16.png, Screenshot_From_2025-10-03_15-20-21.png, Screenshot_From_2025-10-03_15-20-26.png]
github: github.com/solomonadzape95/lisk-analytics-dashboard.git
website: liskanlytics.vercel.app
date: 2025-07-20
---
## stack
nextjs, api routes, typescript, moralis apis, react query, prisma, recharts
## idea
this was a clients project so the idea wasn't mine, the task was initially to build a dune dashboard data analytics project from two tokens on the lisk chain (lzar and lusd)
## implementation
the data for these tokens were not indexed on dune. i confirmed this through some emails i exchanged with them. so i looked for other ways to get and render blockchain data and i came across [moralis](moralis.com) and using their api i wired a nextjs dashboard up with the necessary data. i used recharts on shadcn to render the charts and i persisted data with a simple prisma db.
