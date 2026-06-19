import { FastifyInstance } from 'fastify';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { healthRoutes } from './health.routes';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes, { prefix: '/health' });
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(userRoutes, { prefix: '/users' });
}