import { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repository/UserRepository.ts'
import { WalletRepository } from '../repository/WalletRepository.ts'
import { CreateUserService } from '../services/CreateUserService.ts'
import { GetUserService } from '../services/GetUserService.ts'
import { Prisma } from '../prisma/generated/client.ts'


export class UserController {

    private userRepository = new UserRepository();
    private walletRepository = new WalletRepository();

    
    async create(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
        try {
            const body = req.body as Prisma.UserCreateInput;
            const createUserService = new CreateUserService(this.userRepository, this.walletRepository);


            const user = await createUserService.execute(body)

            return res.code(201).send(user)

        } catch (error: any) {
            return res.code(500).send({error: error.message})
        }
    }

    async getByLookup(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
        try {
            const { type, value } = req.params as any
            const getUserService = new GetUserService();
            console.log('CHEGOU NO CONTROLLER')
            const serviceMap: Record<string, (v: string) => Promise<any>> = {
                id: async (v: string) => await getUserService.getUserById(v),
                document: async (v: string) => await getUserService.getUserByDocument(v),
                email: async (v: string) => await getUserService.getUserByEmail(v),
            }

            const handler = serviceMap[type]
            if (!handler) {
                return res.code(400).send({ error: 'Parâmetro inválido' })
            }

            const user = await handler(value)
            return res.code(200).send(user)
        } catch (error: any) {
            return res.code(500).send({ error: error.message })
        }
    }
}