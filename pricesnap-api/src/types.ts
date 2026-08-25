import { z } from 'zod'

export const BarcodeSchema = z.string().regex(/^\d{8,14}$/)

export type DealScore = 'great' | 'good' | 'fair' | 'overpriced'
export interface RetailerOffer {
  store: string
  price: number
  logo: string
  inStock: boolean
}

export interface ProductResult {
  barcode: string
  name: string
  brand: string
  image: string
  offers: RetailerOffer[]
  dealScore: DealScore
  avgPrice90Day: number
}

export type ProductSnapshot = Omit<ProductResult, 'dealScore'>

export const BarcodeParamsSchema = z.object({
  barcode: BarcodeSchema,
})
