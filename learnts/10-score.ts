// This is calculateDealScore from PriceSnap
// Run: npm run 10

type Score = 'great' | 'good' | 'fair' | 'overpriced'

function calculateDealScore(bestPrice: number, avg: number): Score {
  const ratio = (avg - bestPrice) / avg
  if (ratio > 0.10) return 'great'
  if (ratio > 0) return 'good'
  if (bestPrice === avg) return 'fair'
  return 'overpriced'
}

console.log('1.28 vs 1.79', calculateDealScore(1.28, 1.79))
console.log('95 vs 100', calculateDealScore(95, 100))
console.log('100 vs 100', calculateDealScore(100, 100))
console.log('110 vs 100', calculateDealScore(110, 100))
