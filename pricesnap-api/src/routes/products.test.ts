import Fastify from 'fastify'
import { describe, expect, it } from 'vitest'
import { productRoutes } from './products'

describe('productRoutes', () => {
  it('returns 400 for a malformed barcode', async () => {
    const app = Fastify()
    await app.register(productRoutes)

    const response = await app.inject({
      method: 'GET',
      url: '/products/abcdefgh',
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toEqual({
      error: 'Invalid barcode',
    })
  })

  it('returns 200 for a known barcode', async () => {
    const app = Fastify()
    await app.register(productRoutes)

    const response = await app.inject({
      method: 'GET',
      url: '/products/0194252914687',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().barcode).toBe('0194252914687')
  })
})
