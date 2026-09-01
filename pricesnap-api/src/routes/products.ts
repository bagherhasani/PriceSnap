import { FastifyInstance } from 'fastify' // FastifyInstance is the type of the app object
import { buildProductResult } from '../comparison' // the func that builds the product result
import { products, resolveProduct } from '../mockData' // the mock data
import { BarcodeSchema } from '../types'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    return Object.values(products).map(buildProductResult)
  })

  // Get a product by barcode pass barcode returns product details
  app.get<{ Params: { barcode: string } }>('/products/:barcode', async (request, reply) => {
    const parsed = BarcodeSchema.safeParse(request.params.barcode)

    if (!parsed.success) {
      return reply.status(400).send({
        error: 'Invalid barcode',
      })
    }

    const product = resolveProduct(parsed.data)
    return buildProductResult(product)
  })
}
