import { FastifyInstance } from 'fastify'
import { buildProductResult } from '../comparison'
import { products } from '../mockData'
import { BarcodeParamsSchema } from '../types'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products/:barcode', async (request, reply) => {
    const parsed = BarcodeParamsSchema.safeParse(request.params)

    if (!parsed.success) {
      return reply.status(400).send({
        error: 'Invalid barcode',
      })
    }

    const product = products[parsed.data.barcode]

    if (!product) {
      return reply.status(404).send({
        error: 'Product not found',
      })
    }

    return buildProductResult(product)
  })
}
