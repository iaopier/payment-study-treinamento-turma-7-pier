import { FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { userRoutes } from './user.routes.ts'


export function appRoutes(app: FastifyInstance) {
    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);
    app.register(userRoutes, { prefix: '/users' });
}