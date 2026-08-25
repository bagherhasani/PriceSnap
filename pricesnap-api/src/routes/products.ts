import { FastifyInstance } from 'fastify'
import { buildProductResult } from '../comparison'
import { products, resolveProduct } from '../mockData'
import { BarcodeParamsSchema } from '../types'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    return Object.values(products).map(buildProductResult)
  })

  app.get('/products/:barcode', async (request, reply) => {
    const parsed = BarcodeParamsSchema.safeParse(request.params)

    if (!parsed.success) {
      return reply.status(400).send({
        error: 'Invalid barcode',
      })
    }

    const product = resolveProduct(parsed.data.barcode)
    return buildProductResult(product)
  })
}
