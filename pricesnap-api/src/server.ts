import Fastify from 'fastify'
import { productRoutes } from './products.js' // .js = compiled name; the file is still products.ts

const app = Fastify({ logger: true })

app.get('/health', async () => {
  return { status: 'ok' }
})

//register the prodcuts routes on start
app.register(productRoutes)

// 0.0.0.0 so a real iPhone can hit this Mac on Wi-Fi (localhost would be the phone)
app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
