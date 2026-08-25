import { ProductSnapshot, RetailerOffer } from './types'

export const defaultBarcode = '049000028904'

function searchUrl(store: string, query: string): string {
  const q = encodeURIComponent(query)
  if (store === 'Amazon') return `https://www.amazon.com/s?k=${q}`
  if (store === 'Walmart') return `https://www.walmart.com/search?q=${q}`
  if (store === 'Target') return `https://www.target.com/s?searchTerm=${q}`
  if (store === 'eBay') return `https://www.ebay.com/sch/i.html?_nkw=${q}`
  if (store === 'Best Buy') return `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`
  return `https://www.google.com/search?q=${q}`
}

function priced(query: string, rows: Omit<RetailerOffer, 'url'>[]): RetailerOffer[] {
  return rows.map((row) => ({ ...row, url: searchUrl(row.store, query) }))
}

export const products: Record<string, ProductSnapshot> = {
  '049000028904': {
    barcode: '049000028904',
    name: 'Purified Water 20 oz',
    brand: 'Dasani',
    image: 'dasani',
    avgPrice90Day: 1.79,
    inStorePrice: 2.49,
    offers: priced('Dasani Purified Water 20 oz', [
      { store: 'Walmart', price: 1.28, logo: 'cart.fill',        inStock: true  },
      { store: 'Target',  price: 1.49, logo: 'target',           inStock: true  },
      { store: 'Amazon',  price: 1.67, logo: 'shippingbox.fill', inStock: true  },
      { store: 'eBay',    price: 0.99, logo: 'tag.fill',         inStock: false },
    ]),
  },
  '0194252914687': {
    barcode: '0194252914687',
    name: 'Air Max 270',
    brand: 'Nike',
    image: 'airmax',
    avgPrice90Day: 96.00,
    inStorePrice: 119.99,
    offers: priced('Nike Air Max 270', [
      { store: 'eBay',     price: 79.00, logo: 'tag.fill',         inStock: true  },
      { store: 'Walmart',  price: 84.99, logo: 'cart.fill',        inStock: true  },
      { store: 'Amazon',   price: 89.99, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',   price: 94.99, logo: 'target',           inStock: true  },
      { store: 'Best Buy', price: 99.00, logo: 'tv.fill',          inStock: false },
    ]),
  },
  '0885909950805': {
    barcode: '0885909950805',
    name: 'iPhone 15 Case',
    brand: 'Apple',
    image: 'phonecase',
    avgPrice90Day: 49.00,
    inStorePrice: 54.99,
    offers: priced('Apple iPhone 15 Case', [
      { store: 'Amazon',  price: 45.99, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',  price: 49.00, logo: 'target',           inStock: true  },
      { store: 'Walmart', price: 51.00, logo: 'cart.fill',        inStock: true  },
      { store: 'eBay',    price: 38.00, logo: 'tag.fill',         inStock: false },
    ]),
  },
  '027242921014': {
    barcode: '027242921014',
    name: 'WH-1000XM5',
    brand: 'Sony',
    image: 'headphones',
    avgPrice90Day: 348.00,
    inStorePrice: 399.99,
    offers: priced('Sony WH-1000XM5', [
      { store: 'Best Buy', price: 328.00, logo: 'tv.fill',            inStock: true  },
      { store: 'Amazon',   price: 348.00, logo: 'shippingbox.fill',   inStock: true  },
      { store: 'Walmart',  price: 349.00, logo: 'cart.fill',          inStock: true  },
      { store: 'eBay',     price: 279.00, logo: 'tag.fill',           inStock: false },
    ]),
  },
  '076210851308': {
    barcode: '076210851308',
    name: 'Pike Place Roast 12 oz',
    brand: 'Starbucks',
    image: 'coffee',
    avgPrice90Day: 12.49,
    inStorePrice: 14.99,
    offers: priced('Starbucks Pike Place Roast 12 oz', [
      { store: 'Target',  price: 11.29, logo: 'target',           inStock: true  },
      { store: 'Walmart', price: 11.98, logo: 'cart.fill',        inStock: true  },
      { store: 'Amazon',  price: 13.49, logo: 'shippingbox.fill', inStock: true  },
    ]),
  },
  '196625011234': {
    barcode: '196625011234',
    name: 'Leather Daypack',
    brand: 'Fossil',
    image: 'backpack',
    avgPrice90Day: 168.00,
    inStorePrice: 198.00,
    offers: priced('Fossil Leather Daypack', [
      { store: 'Amazon',  price: 149.00, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',  price: 179.00, logo: 'target',           inStock: true  },
      { store: 'eBay',    price: 129.00, logo: 'tag.fill',         inStock: false },
    ]),
  },
  '711719548311': {
    barcode: '711719548311',
    name: 'PlayStation 5 Console',
    brand: 'Sony',
    image: 'controller',
    avgPrice90Day: 499.00,
    inStorePrice: 549.99,
    offers: priced('Sony PlayStation 5 Console', [
      { store: 'Best Buy', price: 499.00, logo: 'tv.fill',            inStock: true  },
      { store: 'Walmart',  price: 499.00, logo: 'cart.fill',          inStock: true  },
      { store: 'Amazon',   price: 549.00, logo: 'shippingbox.fill',   inStock: false },
      { store: 'eBay',     price: 470.00, logo: 'tag.fill',           inStock: false },
    ]),
  },
  '019425340012': {
    barcode: '019425340012',
    name: 'Sport Watch GPS',
    brand: 'Apple',
    image: 'watch',
    avgPrice90Day: 379.00,
    inStorePrice: 399.00,
    offers: priced('Apple Watch GPS', [
      { store: 'Best Buy', price: 349.00, logo: 'tv.fill',            inStock: true  },
      { store: 'Amazon',   price: 379.00, logo: 'shippingbox.fill',   inStock: true  },
      { store: 'Walmart',  price: 389.00, logo: 'cart.fill',          inStock: true  },
    ]),
  },
  '080547101010': {
    barcode: '080547101010',
    name: 'Aviator Classic',
    brand: 'Ray-Ban',
    image: 'sunglasses',
    avgPrice90Day: 161.00,
    inStorePrice: 204.00,
    offers: priced('Ray-Ban Aviator Classic', [
      { store: 'Amazon',  price: 154.00, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',  price: 169.00, logo: 'target',           inStock: true  },
      { store: 'eBay',    price: 119.00, logo: 'tag.fill',         inStock: false },
    ]),
  },
  '013800150738': {
    barcode: '013800150738',
    name: 'Golden Fries 28 oz',
    brand: 'Ore-Ida',
    image: 'chips',
    avgPrice90Day: 4.29,
    inStorePrice: 5.49,
    offers: priced('Ore-Ida Golden Fries 28 oz', [
      { store: 'Walmart', price: 3.84, logo: 'cart.fill',        inStock: true  },
      { store: 'Target',  price: 4.19, logo: 'target',           inStock: true  },
      { store: 'Amazon',  price: 6.99, logo: 'shippingbox.fill', inStock: true  },
    ]),
  },
}

export function resolveProduct(barcode: string): ProductSnapshot {
  return products[barcode] ?? products[defaultBarcode]
}
