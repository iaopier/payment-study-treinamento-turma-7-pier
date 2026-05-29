import fastify from 'fastify'
import { appRoutes } from './routes/index.ts'

const port = 3000;

const app = fastify({
  logger: process.env.NODE_ENV === 'dev'
})

app.register(appRoutes);

const start = async () => {
  try {
    app.listen({
      port, host: 'localhost'
    })
    console.log(`SERVIDOR RODANDO EM: http://localhost:${port}`)
  } catch (error) {
    app.log.error(error);
    process.exit(1)
  }
}

start();
