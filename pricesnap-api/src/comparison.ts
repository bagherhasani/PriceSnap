import { DealScore, ProductResult, ProductSnapshot, RetailerOffer } from './types'

export function sortOffers(offers: RetailerOffer[]): RetailerOffer[] {
  return [...offers].sort((a, b) => {
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1
    }
    return a.price - b.price
  })
}

export function findCheapest(offers: RetailerOffer[]): RetailerOffer | null {
  return sortOffers(offers).find((offer) => offer.inStock) ?? null
}

export function calculateDealScore(bestPrice: number, avgPrice90Day: number): DealScore {
  const savingsRatio = (avgPrice90Day - bestPrice) / avgPrice90Day

  if (savingsRatio > 0.10) return 'great'
  if (savingsRatio > 0) return 'good'
  if (bestPrice === avgPrice90Day) return 'fair'
  return 'overpriced'
}

export function buildProductResult(product: ProductSnapshot): ProductResult {
  const offers = sortOffers(product.offers)
  const bestPrice = findCheapest(offers)?.price ?? offers[0]?.price ?? product.avgPrice90Day

  return {
    ...product,
    offers,
    dealScore: calculateDealScore(bestPrice, product.avgPrice90Day),
  }
}
