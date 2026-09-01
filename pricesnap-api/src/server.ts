import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Fastify from 'fastify'
import { productRoutes } from './routes/products'

const app = Fastify({ logger: true }) //initialize the server and log each request

// Browser demo HTML is a different origin; iOS URLSession does not need this.
app.addHook('onSend', async (_request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
})

// Serves public/index.html for a browser demo. The iPhone never hits /.
app.get('/', async (_request, reply) => {
  const html = readFileSync(join(process.cwd(), 'public', 'index.html'), 'utf8')
  return reply.type('text/html; charset=utf-8').send(html)
})

// health check endpoint
app.get('/health', async () => {
  return { status: 'ok' }
})

app.register(productRoutes)

// 0.0.0.0: a physical iPhone cannot use localhost (that would be the phone itself).
app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
