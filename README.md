# PriceSnap

PriceSnap is a barcode-driven price comparison app. The iOS app scans a product barcode, sends it to a TypeScript API, and shows the best available offer from a small retailer dataset.

This repo is intentionally small. The goal is to show a clean end-to-end flow between a Swift client and a typed backend, not to pretend the project already has live retailer integrations.

## Stack

- SwiftUI for the iOS app
- TypeScript + Fastify for the API
- Zod for request validation
- Vitest for backend tests
- Docker for packaging the API

## Architecture

```text
iOS barcode scan
      ↓
ResultView loads product by barcode
      ↓
GET /products/:barcode
      ↓
Fastify route validates barcode
      ↓
comparison.ts computes best offer + deal score
      ↓
SwiftUI renders the product and retailer prices
```

## Project Structure

```text
PriceSnap/
├── PriceSnap/              # SwiftUI app
├── PriceSnap.xcodeproj     # Xcode project
└── pricesnap-api/          # TypeScript backend
```

## What Works Today

- camera-based barcode scanning in the iOS app
- local TypeScript API for barcode lookup
- retailer offer sorting with in-stock offers first
- deal score calculation (`great`, `good`, `fair`, `overpriced`)
- backend tests for comparison logic and route behavior

## Run the API

```bash
cd pricesnap-api
npm install
npm run dev
```

Useful endpoints:

- `GET /health`
- `GET /products/0194252914687`

## Run the iOS App

1. Open `PriceSnap.xcodeproj` in Xcode
2. Run the app in the iPhone simulator
3. Use the simulator to verify the UI and local API connection
4. Use a physical iPhone for camera-based scanning

Known demo barcode for the API:

```text
0194252914687
```

The app currently points to `http://localhost:3000`, which works best in the simulator. If you want to run on a physical iPhone, replace that base URL with your Mac's local IP address.

## Test the Backend

```bash
cd pricesnap-api
npm test
npm run build
```

## Current Scope

Retailer data is mocked inside the backend. That is a deliberate tradeoff for this version of the project: the app demonstrates the client-server contract, sorting logic, validation, and UI flow without depending on unstable third-party scraping or paid retailer APIs.