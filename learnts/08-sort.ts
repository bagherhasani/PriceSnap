// Python: sorted(xs, key=...) but sort mutates, so copy first
// Run: npm run 08

const offers = [
  { store: 'eBay', price: 0.99, inStock: false },
  { store: 'Target', price: 1.49, inStock: true },
  { store: 'Walmart', price: 1.28, inStock: true },
]

const sorted = [...offers].sort((a, b) => {
  if (a.inStock !== b.inStock) {
    return a.inStock ? -1 : 1
  }
  return a.price - b.price
})

console.log(sorted.map((o) => o.store))
console.log('original first', offers[0].store)
