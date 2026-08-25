import { describe, expect, it } from 'vitest'
import { buildProductResult, calculateDealScore, findCheapest, sortOffers } from './comparison'
import { ProductSnapshot, RetailerOffer } from './types'

describe('sortOffers', () => {
  it('puts in-stock offers before out-of-stock offers', () => {
    const offers: RetailerOffer[] = [
      { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false },
      { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true },
      { store: 'Target', price: 49, logo: 'target', inStock: true },
    ]

    expect(sortOffers(offers).map((offer) => offer.store)).toEqual([
      'Amazon',
      'Target',
      'eBay',
    ])
  })
})

describe('findCheapest', () => {
  it('returns the cheapest in-stock offer', () => {
    const offers: RetailerOffer[] = [
      { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false },
      { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true },
      { store: 'Walmart', price: 42, logo: 'cart.fill', inStock: true },
    ]

    expect(findCheapest(offers)?.store).toBe('Walmart')
  })
})

describe('calculateDealScore', () => {
  it('returns great when the best price is more than 10 percent below average', () => {
    expect(calculateDealScore(79, 96)).toBe('great')
  })

  it('returns overpriced when the best price is above average', () => {
    expect(calculateDealScore(10, 8.5)).toBe('overpriced')
  })
})

describe('buildProductResult', () => {
  it('returns sorted offers and a computed deal score', () => {
    const product: ProductSnapshot = {
      barcode: '12345678',
      name: 'Test Product',
      brand: 'Test Brand',
      image: 'shippingbox.fill',
      avgPrice90Day: 100,
      offers: [
        { store: 'Store B', price: 95, logo: 'b.circle.fill', inStock: true },
        { store: 'Store A', price: 80, logo: 'a.circle.fill', inStock: true },
        { store: 'Store C', price: 70, logo: 'c.circle.fill', inStock: false },
      ],
    }

    const result = buildProductResult(product)

    expect(result.offers.map((offer) => offer.store)).toEqual([
      'Store A',
      'Store B',
      'Store C',
    ])
    expect(result.dealScore).toBe('great')
  })
})
