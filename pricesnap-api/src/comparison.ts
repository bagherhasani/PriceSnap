import { ProductResult, ProductSnapshot, RetailerOffer } from './types'

export function sortOffers(offers: RetailerOffer[]): RetailerOffer[] {
  return [...offers].sort((left, right) => {
    if (left.inStock !== right.inStock) {
      return left.inStock ? -1 : 1
    }

    return left.price - right.price
  })
}

export function findCheapest(offers: RetailerOffer[]): RetailerOffer | null {
  const inStockOffers = offers.filter((offer) => offer.inStock)

  if (inStockOffers.length === 0) {
    return null
  }

  return sortOffers(inStockOffers)[0]
}

export function calculateDealScore(bestPrice: number, avgPrice90Day: number): ProductResult['dealScore'] {
  const savingsRatio = (avgPrice90Day - bestPrice) / avgPrice90Day

  if (savingsRatio > 0.10) {
    return 'great'
  }

  if (savingsRatio > 0) {
    return 'good'
  }

  if (bestPrice === avgPrice90Day) {
    return 'fair'
  }

  return 'overpriced'
}

export function buildProductResult(product: ProductSnapshot): ProductResult {
  const offers = sortOffers(product.offers)
  const cheapest = offers.find((offer) => offer.inStock)
  const bestPrice = cheapest?.price ?? offers[0]?.price ?? product.avgPrice90Day

  return {
    ...product,
    offers,
    dealScore: calculateDealScore(bestPrice, product.avgPrice90Day),
  }
}
