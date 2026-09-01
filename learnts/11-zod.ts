// Python: pydantic  — types disappear at runtime, Zod checks the string
// Run: npm run 11

import { z } from 'zod'

const Barcode = z.string().regex(/^\d{8,14}$/)

function check(raw: string) {
  const parsed = Barcode.safeParse(raw)
  if (!parsed.success) {
    console.log(raw, '→ invalid')
    return
  }
  console.log(raw, '→ ok')
}

check('049000028904')
check('abcdefgh')
check('12')
