import { z } from 'zod' // import zod for validation

export const BarcodeSchema = z.string().regex(/^\d{8,14}$/) // regex for barcode validation lenth 8-14

export type DealScore = 'great' | 'good' | 'fair' | 'overpriced'//union type for deals 

// store (will be one row)
export interface RetailerOffer {
  store: string
  price: number
  logo: string
  inStock: boolean
  url: string //link to buy
}

// product result
export interface ProductResult {
  barcode: string
  name: string
  brand: string
  image: string
  offers: RetailerOffer[]
  dealScore: DealScore
  avgPrice90Day: number
  inStorePrice: number
}

// drop the dealscore (because mock shdn't store a badge)
export type ProductSnapshot = Omit<ProductResult, 'dealScore'>



