import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod';
import { UserController } from '../controllers/UserController.ts';

export async function userRoutes(app: FastifyInstance) {

    const userController = new UserController();

    app.withTypeProvider<ZodTypeProvider>().post(
        '/',
        {
            schema: {
                body: z.object({
                    fullName: z.string().min(3, "O nome deve ter mais de 3 caractéres"),
                    document: z.string().min(11, "Documento Inválido").max(14),
                    email: z.email("Email Inválido"),
                    password: z.string().min(6, "A senha deve ter pelo menos 6 caractéres"),
                    userType: z.enum(["COMMON", "MERCHANT"])
                })
            }
        },
        userController.create
    )

    app.withTypeProvider<ZodTypeProvider>().get(
        '/:type/:value',
        {
            schema: {
                params: z.object({
                    type: z.enum(["id", "document", "email"]),
                    value: z.string().min(1),
                }),
            },
        },
        userController.getByLookup
    )
}