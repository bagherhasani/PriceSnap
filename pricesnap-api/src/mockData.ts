import { ProductSnapshot } from './types'

export const products: Record<string, ProductSnapshot> = {
  '0194252914687': {
    barcode: '0194252914687',
    name: 'Air Max 270',
    brand: 'Nike',
    image: 'shoeprints.fill',
    avgPrice90Day: 96.00,
    offers: [
      { store: 'eBay',     price: 79.00, logo: 'tag.fill',         inStock: true  },
      { store: 'Walmart',  price: 84.99, logo: 'cart.fill',        inStock: true  },
      { store: 'Amazon',   price: 89.99, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',   price: 94.99, logo: 'target',           inStock: true  },
      { store: 'Best Buy', price: 99.00, logo: 'tv.fill',          inStock: false },
    ],
  },
  '0885909950805': {
    barcode: '0885909950805',
    name: 'iPhone 15 Case',
    brand: 'Apple',
    image: 'iphone',
    avgPrice90Day: 49.00,
    offers: [
      { store: 'Amazon',  price: 45.99, logo: 'shippingbox.fill', inStock: true  },
      { store: 'Target',  price: 49.00, logo: 'target',           inStock: true  },
      { store: 'Walmart', price: 51.00, logo: 'cart.fill',        inStock: true  },
      { store: 'eBay',    price: 38.00, logo: 'tag.fill',         inStock: false },
    ],
  },
  '0012000161155': {
    barcode: '0012000161155',
    name: 'Pepsi 12-pack',
    brand: 'Pepsi',
    image: 'takeoutbag.and.cup.and.straw.fill',
    avgPrice90Day: 8.50,
    offers: [
      { store: 'Walmart', price: 9.98, logo: 'cart.fill',        inStock: true },
      { store: 'Target',  price: 10.49, logo: 'target',           inStock: true },
      { store: 'Amazon',  price: 11.99, logo: 'shippingbox.fill', inStock: true },
    ],
  },
}
