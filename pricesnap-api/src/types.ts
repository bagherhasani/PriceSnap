import { z } from 'zod' //runtime validation

// runtime check: barcode is digits, length 8–14 (UPC/EAN)
export const BarcodeSchema = z.string().regex(/^\d{8,14}$/)

export type DealScore = 'great' | 'good' | 'fair' | 'overpriced'

// one store row
export interface RetailerOffer {
  store: string
  price: number
  logo: string
  inStock: boolean
  url: string
}

// JSON the phone receives. dealScore is filled in by withScore, not stored in the table.
export interface ProductResult {
  barcode: string
  name: string
  brand: string
  image: string
  offers: RetailerOffer[]
  dealScore?: DealScore
  avgPrice90Day: number
  inStorePrice: number
}


