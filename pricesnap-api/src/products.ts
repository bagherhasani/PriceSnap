import { FastifyInstance } from 'fastify'
import {
  BarcodeSchema,
  DealScore,
  ProductResult,
  RetailerOffer,
} from './types.js'

const DASANI = '049000028904'


//give back url based on the name and query
function searchUrl(store: string, query: string): string {
  const q = encodeURIComponent(query)
  if (store === 'Amazon') return `https://www.amazon.com/s?k=${q}`
  if (store === 'Walmart') return `https://www.walmart.com/search?q=${q}`
  if (store === 'Target') return `https://www.target.com/s?searchTerm=${q}`
  if (store === 'eBay') return `https://www.ebay.com/sch/i.html?_nkw=${q}`
  if (store === 'Best Buy') return `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`
  return `https://www.google.com/search?q=${q}`
}


const products: Record<string, ProductResult> = {
  '049000028904': {
    barcode: '049000028904',
    name: 'Purified Water 20 oz',
    brand: 'Dasani',
    image: 'dasani',
    avgPrice90Day: 1.79,
    inStorePrice: 2.49,
    offers: [
      { store: 'Walmart', price: 1.28, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Dasani Purified Water 20 oz') },
      { store: 'Target', price: 1.49, logo: 'target', inStock: true, url: searchUrl('Target', 'Dasani Purified Water 20 oz') },
      { store: 'Amazon', price: 1.67, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Dasani Purified Water 20 oz') },
      { store: 'eBay', price: 0.99, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Dasani Purified Water 20 oz') },
    ],
  },
  '0194252914687': {
    barcode: '0194252914687',
    name: 'Air Max 270',
    brand: 'Nike',
    image: 'airmax',
    avgPrice90Day: 96.00,
    inStorePrice: 119.99,
    offers: [
      { store: 'eBay', price: 79.00, logo: 'tag.fill', inStock: true, url: searchUrl('eBay', 'Nike Air Max 270') },
      { store: 'Walmart', price: 84.99, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Nike Air Max 270') },
      { store: 'Amazon', price: 89.99, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Nike Air Max 270') },
      { store: 'Target', price: 94.99, logo: 'target', inStock: true, url: searchUrl('Target', 'Nike Air Max 270') },
      { store: 'Best Buy', price: 99.00, logo: 'tv.fill', inStock: false, url: searchUrl('Best Buy', 'Nike Air Max 270') },
    ],
  },
  '0885909950805': {
    barcode: '0885909950805',
    name: 'iPhone 15 Case',
    brand: 'Apple',
    image: 'phonecase',
    avgPrice90Day: 49.00,
    inStorePrice: 54.99,
    offers: [
      { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Apple iPhone 15 Case') },
      { store: 'Target', price: 49.00, logo: 'target', inStock: true, url: searchUrl('Target', 'Apple iPhone 15 Case') },
      { store: 'Walmart', price: 51.00, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Apple iPhone 15 Case') },
      { store: 'eBay', price: 38.00, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Apple iPhone 15 Case') },
    ],
  },
  '027242921014': {
    barcode: '027242921014',
    name: 'WH-1000XM5',
    brand: 'Sony',
    image: 'headphones',
    avgPrice90Day: 348.00,
    inStorePrice: 399.99,
    offers: [
      { store: 'Best Buy', price: 328.00, logo: 'tv.fill', inStock: true, url: searchUrl('Best Buy', 'Sony WH-1000XM5') },
      { store: 'Amazon', price: 348.00, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Sony WH-1000XM5') },
      { store: 'Walmart', price: 349.00, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Sony WH-1000XM5') },
      { store: 'eBay', price: 279.00, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Sony WH-1000XM5') },
    ],
  },
  '076210851308': {
    barcode: '076210851308',
    name: 'Pike Place Roast 12 oz',
    brand: 'Starbucks',
    image: 'coffee',
    avgPrice90Day: 12.49,
    inStorePrice: 14.99,
    offers: [
      { store: 'Target', price: 11.29, logo: 'target', inStock: true, url: searchUrl('Target', 'Starbucks Pike Place Roast 12 oz') },
      { store: 'Walmart', price: 11.98, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Starbucks Pike Place Roast 12 oz') },
      { store: 'Amazon', price: 13.49, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Starbucks Pike Place Roast 12 oz') },
    ],
  },
  '196625011234': {
    barcode: '196625011234',
    name: 'Leather Daypack',
    brand: 'Fossil',
    image: 'backpack',
    avgPrice90Day: 168.00,
    inStorePrice: 198.00,
    offers: [
      { store: 'Amazon', price: 149.00, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Fossil Leather Daypack') },
      { store: 'Target', price: 179.00, logo: 'target', inStock: true, url: searchUrl('Target', 'Fossil Leather Daypack') },
      { store: 'eBay', price: 129.00, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Fossil Leather Daypack') },
    ],
  },
  '711719548311': {
    barcode: '711719548311',
    name: 'PlayStation 5 Console',
    brand: 'Sony',
    image: 'controller',
    avgPrice90Day: 499.00,
    inStorePrice: 549.99,
    offers: [
      { store: 'Best Buy', price: 499.00, logo: 'tv.fill', inStock: true, url: searchUrl('Best Buy', 'Sony PlayStation 5 Console') },
      { store: 'Walmart', price: 499.00, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Sony PlayStation 5 Console') },
      { store: 'Amazon', price: 549.00, logo: 'shippingbox.fill', inStock: false, url: searchUrl('Amazon', 'Sony PlayStation 5 Console') },
      { store: 'eBay', price: 470.00, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Sony PlayStation 5 Console') },
    ],
  },
  '019425340012': {
    barcode: '019425340012',
    name: 'Sport Watch GPS',
    brand: 'Apple',
    image: 'watch',
    avgPrice90Day: 379.00,
    inStorePrice: 399.00,
    offers: [
      { store: 'Best Buy', price: 349.00, logo: 'tv.fill', inStock: true, url: searchUrl('Best Buy', 'Apple Watch GPS') },
      { store: 'Amazon', price: 379.00, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Apple Watch GPS') },
      { store: 'Walmart', price: 389.00, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Apple Watch GPS') },
    ],
  },
  '080547101010': {
    barcode: '080547101010',
    name: 'Aviator Classic',
    brand: 'Ray-Ban',
    image: 'sunglasses',
    avgPrice90Day: 161.00,
    inStorePrice: 204.00,
    offers: [
      { store: 'Amazon', price: 154.00, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Ray-Ban Aviator Classic') },
      { store: 'Target', price: 169.00, logo: 'target', inStock: true, url: searchUrl('Target', 'Ray-Ban Aviator Classic') },
      { store: 'eBay', price: 119.00, logo: 'tag.fill', inStock: false, url: searchUrl('eBay', 'Ray-Ban Aviator Classic') },
    ],
  },
  '013800150738': {
    barcode: '013800150738',
    name: 'Golden Fries 28 oz',
    brand: 'Ore-Ida',
    image: 'chips',
    avgPrice90Day: 4.29,
    inStorePrice: 5.49,
    offers: [
      { store: 'Walmart', price: 3.84, logo: 'cart.fill', inStock: true, url: searchUrl('Walmart', 'Ore-Ida Golden Fries 28 oz') },
      { store: 'Target', price: 4.19, logo: 'target', inStock: true, url: searchUrl('Target', 'Ore-Ida Golden Fries 28 oz') },
      { store: 'Amazon', price: 6.99, logo: 'shippingbox.fill', inStock: true, url: searchUrl('Amazon', 'Ore-Ida Golden Fries 28 oz') },
    ],
  },
}

// Missing item return Dasani (demo). Production would 404.
function lookup(barcode: string): ProductResult {
  return products[barcode] ?? products[DASANI]
}

// funtion for sorting  which store row goes first then one that is in the stock -1 goes first 
function compareOffers(a: RetailerOffer, b: RetailerOffer): number {
  if (a.inStock === true && b.inStock === false) {
    return -1
  }
  if (a.inStock === false && b.inStock === true) {
    return 1
  }
  if (a.price < b.price) {
    return -1
  }
  if (a.price > b.price) {
    return 1
  }
  return 0
}


function sortOffers(offers: RetailerOffer[]): RetailerOffer[] {
  const copy = [...offers] // copy: sort mutates
  copy.sort(compareOffers)
  return copy
}

// find the cheapest in-stock offer
function findCheapest(offers: RetailerOffer[]): RetailerOffer | null {
  const sorted = sortOffers(offers)
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].inStock) {
      return sorted[i]
    }
  }
  return null
}

// Badge vs 90-day average. Catalog rows do not store this.
function dealScore(bestPrice: number, avg: number): DealScore {
  const ratio = (avg - bestPrice) / avg
  if (ratio > 0.10) return 'great'
  if (ratio > 0) return 'good'
  if (bestPrice === avg) return 'fair'
  return 'overpriced'
}



function withScore(product: ProductResult): ProductResult {
  const offers = sortOffers(product.offers)
  const cheapest = findCheapest(offers)

  let bestPrice = product.avgPrice90Day
  if (cheapest !== null) {
    bestPrice = cheapest.price // first in-stock after sort
  } else if (offers.length > 0) {
    bestPrice = offers[0].price // all OOS: still rank, badge vs cheapest OOS
  }

  return {
    ...product,
    offers,
    dealScore: dealScore(bestPrice, product.avgPrice90Day),
  }
}

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const list = Object.values(products)
    const ranked: ProductResult[] = []
    for (let i = 0; i < list.length; i++) {
      ranked.push(withScore(list[i]))
    }
    return ranked
  })

  app.get<{ Params: { barcode: string } }>('/products/:barcode', async (request, reply) => {
    const parsed = BarcodeSchema.safeParse(request.params.barcode)

    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid barcode' })
    }

    return withScore(lookup(parsed.data))
  })
}
