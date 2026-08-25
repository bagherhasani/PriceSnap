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

  it('returns the sample catalog', async () => {
    const app = Fastify()
    await app.register(productRoutes)

    const response = await app.inject({
      method: 'GET',
      url: '/products',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toHaveLength(10)
  })

  it('returns a sample product for an unknown barcode', async () => {
    const app = Fastify()
    await app.register(productRoutes)

    const response = await app.inject({
      method: 'GET',
      url: '/products/12345678',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().barcode).toBe('049000028904')
    expect(response.json().brand).toBe('Dasani')
    expect(response.json().inStorePrice).toBe(2.49)
    expect(response.json().dealScore).toBe('great')
  })
})
