// Python: next((x for x in xs if x.in_stock), None)
// Run: npm run 09

const offers = [
  { store: 'eBay', price: 0.99, inStock: false },
  { store: 'Walmart', price: 1.28, inStock: true },
]

const best = offers.find((o) => o.inStock) ?? null
const none = [{ store: 'eBay', price: 0.99, inStock: false }].find((o) => o.inStock) ?? null

console.log(best)
console.log(best?.price)
console.log(none)
console.log(none?.price ?? 'no in-stock price')
