import { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repository/UserRepository.ts'
import { WalletRepository } from '../repository/WalletRepository.ts'
import { CreateUserService } from '../services/CreateUserService.ts'
import { Prisma } from '../prisma/generated/client.ts'


export class UserController {
    async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
        try {
            const body = req.body as Prisma.UserCreateInput;

            const userRepository = new UserRepository();
            const walletRepository = new WalletRepository();

            const createUserService = new CreateUserService(userRepository, walletRepository);

            const user = await createUserService.execute(body)

            return res.code(201).send(user)

        } catch (error: any) {
            return res.code(400).send({error: error.message})
        }
    }
}