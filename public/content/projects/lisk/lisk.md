---
published: true
name: lisk-dashboard
description: an analytics dashboard for lzar and lusd activity on the lisk chain.
thumbnail: Screenshot_From_2025-10-03_15-20-09.png
images: [Screenshot_From_2025-10-03_15-20-09.png, Screenshot_From_2025-10-03_15-20-16.png, Screenshot_From_2025-10-03_15-20-21.png, Screenshot_From_2025-10-03_15-20-26.png]
stack: [next.js, moralis, react query, prisma, recharts]
github: github.com/solomonadzape95/lisk-analytics-dashboard.git
website: liskanlytics.vercel.app
date: 2025-07-20
status: shipped
---
## brief

this was a client project for tracking two tokens on lisk: lzar and lusd. the original plan was a dune dashboard, but neither token was indexed there.

## what i did

i moved the data pipeline to [moralis](https://moralis.com), wired its api into a next.js dashboard, persisted the results with prisma, and built the charts with recharts.
