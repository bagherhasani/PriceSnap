# PriceSnap
### Barcode Scan, Typed Price Comparison, and In-Stock Ranking with SwiftUI and Fastify

![Swift](https://img.shields.io/badge/Swift-iOS-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-API-blue)
![Fastify](https://img.shields.io/badge/Fastify-HTTP-black)
![Zod](https://img.shields.io/badge/Zod-Validation-purple)
![Docker](https://img.shields.io/badge/Docker-Packaging-2496ED)
![Vitest](https://img.shields.io/badge/Vitest-Tests-729B1B)

## Project Overview

The goal of this project is to scan a product barcode on an iPhone, look up that product on a backend, and show which store has the best price that is actually in stock.

I built this as a two-layer system: a SwiftUI client for camera scanning and results, and a TypeScript Fastify API for validation, ranking, and deal scoring. The phone should not invent prices. It asks the API for a product and renders what comes back.

The main technical problem is that store data is messy. One retailer can be cheaper but out of stock. Another can be slightly more expensive but available. If the UI just sorts by raw price, an out-of-stock listing can look like the winner. The API ranks in-stock offers first, then by price, and scores the best in-stock price against a 90-day average.

This version uses sample offers for Amazon, Walmart, Target, eBay, and Best Buy. Paid retailer APIs and scraping were out of scope. The contract is written so a live source can replace the dataset later without changing the iOS models.

## Software Architecture

The app and API share the same product shape: barcode, name, brand, offers, deal score, and 90-day average.

```text
iPhone camera (AVFoundation)
        ↓
   barcode string
        ↓
GET /products/:barcode
        ↓
Zod checks the barcode is 8–14 digits
        ↓
lookup sample product
        ↓
comparison.ts
  - in-stock offers first
  - cheapest in-stock price
  - deal score vs 90-day average
        ↓
SwiftUI ResultView
```

```text
PriceSnap/
├── PriceSnap/           # SwiftUI app
├── PriceSnap.xcodeproj
└── pricesnap-api/       # Fastify API
    ├── src/types.ts
    ├── src/mockData.ts
    ├── src/comparison.ts
    ├── src/routes/products.ts
    └── src/server.ts
```

## Deal Score

The API scores the best in-stock price against `avgPrice90Day`:

| Score | Rule |
|---|---|
| `great` | more than 10% below average |
| `good` | below average, but 10% or less |
| `fair` | equal to average |
| `overpriced` | above average |

Out-of-stock offers still show in the list. They cannot be selected as the best price.

## Technical Stack

**Client**
- Swift / SwiftUI
- AVFoundation barcode scanning (EAN-13, EAN-8, UPC-E, QR, Code 128)

**API**
- TypeScript
- Fastify
- Zod
- Vitest
- Docker

## Setup

### API

```bash
cd pricesnap-api
npm install
npm run dev
```

- `GET /health`
- `GET /products/0194252914687`

```bash
npm test
```

Demo barcode: `0194252914687` (Nike Air Max 270).

### iOS

1. Open `PriceSnap.xcodeproj` in Xcode.
2. Keep the API running on port 3000.
3. Run in the iPhone simulator for local API calls (`http://localhost:3000`).
4. Use a physical iPhone for camera scanning. On device, change the API base URL to your Mac's Wi-Fi IP.

## Engineering Challenges

### Shared contract between Swift and TypeScript

The iOS models and the API types have to stay in sync. If the API returns `offers` and Swift still expects `prices`, decoding fails. I kept one product shape on both sides and validated barcodes in the API with Zod, because TypeScript types are gone at runtime.

### In-stock ranking

A cheaper out-of-stock offer should not win. `comparison.ts` sorts available offers first, then by price. The deal score uses the cheapest in-stock price, not the cheapest number in the list.

### Sample data instead of live retailer APIs

Amazon / Walmart / Target feeds need keys, rate limits, and unstable HTML. For this version the API returns a small fixture set so the scan → request → ranking → UI path is testable. The ranking logic does not depend on how the offers were collected.

____
