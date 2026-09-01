import { DealScore, ProductResult, ProductSnapshot, RetailerOffer } from './types'

// Negative = a first. In-stock always beats a cheaper OOS row.
function compareOffers(a: RetailerOffer, b: RetailerOffer): number {
  if (a.inStock !== b.inStock) {
    return a.inStock ? -1 : 1
  }
  return a.price - b.price
}

// sort the offers by price and in stock
export function sortOffers(offers: RetailerOffer[]): RetailerOffer[] {
  const copy = [...offers]
  copy.sort(compareOffers)
  return copy
}

// Best buy = first in-stock after sort. 
export function findCheapest(offers: RetailerOffer[]): RetailerOffer | null {
  const sorted = sortOffers(offers)
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].inStock) {
      return sorted[i]
    }
  }
  return null
}

// Badge vs 90-day average. >10% cheaper is great; catalog does not store this.
export function calculateDealScore(bestPrice: number, avgPrice90Day: number): DealScore {
  const savingsRatio = (avgPrice90Day - bestPrice) / avgPrice90Day

  if (savingsRatio > 0.10) return 'great'
  if (savingsRatio > 0) return 'good'
  if (bestPrice === avgPrice90Day) return 'fair'
  return 'overpriced'
}

// Snapshot in (no badge). Routes call only this.
export function buildProductResult(product: ProductSnapshot): ProductResult {
  const offers = sortOffers(product.offers)
  const cheapest = findCheapest(offers)

  let bestPrice = product.avgPrice90Day
  if (cheapest !== null) {
    bestPrice = cheapest.price
  } else if (offers.length > 0) {
    bestPrice = offers[0].price
  }

  return {
    ...product,
    offers,
    dealScore: calculateDealScore(bestPrice, product.avgPrice90Day),
  }
}
