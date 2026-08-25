import Fastify from 'fastify'
import { productRoutes } from './routes/products'

const app = Fastify({ logger: true })

app.get('/health', async () => {
  return { status: 'ok' }
})

app.register(productRoutes)

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
