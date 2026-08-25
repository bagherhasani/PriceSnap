import { describe, expect, it } from 'vitest'
import { buildProductResult, calculateDealScore, findCheapest, sortOffers } from './comparison'
import { ProductSnapshot, RetailerOffer } from './types'

describe('sortOffers', () => {
  it('puts in-stock offers before out-of-stock offers', () => {
    const offers: RetailerOffer[] = [
      { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false, url: 'https://www.ebay.com' },
      { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true, url: 'https://www.amazon.com' },
      { store: 'Target', price: 49, logo: 'target', inStock: true, url: 'https://www.target.com' },
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
      { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false, url: 'https://www.ebay.com' },
      { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true, url: 'https://www.amazon.com' },
      { store: 'Walmart', price: 42, logo: 'cart.fill', inStock: true, url: 'https://www.walmart.com' },
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
      inStorePrice: 110,
      offers: [
        { store: 'Store B', price: 95, logo: 'b.circle.fill', inStock: true, url: 'https://example.com/b' },
        { store: 'Store A', price: 80, logo: 'a.circle.fill', inStock: true, url: 'https://example.com/a' },
        { store: 'Store C', price: 70, logo: 'c.circle.fill', inStock: false, url: 'https://example.com/c' },
      ],
    }

    const result = buildProductResult(product)

    expect(result.offers.map((offer) => offer.store)).toEqual([
      'Store A',
      'Store B',
      'Store C',
    ])
    expect(result.dealScore).toBe('great')
    expect(result.offers[0].url).toBe('https://example.com/a')
  })
})
