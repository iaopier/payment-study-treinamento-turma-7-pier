import { UserRepository } from "../repository/UserRepository.ts";
import { User } from '../prisma/generated/client.ts'

type SafeUser = Omit<User, 'password'>

export class GetUserService {



    private userRepository = new UserRepository()

    async getUserById(userId: string): Promise<SafeUser> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const { password: _, ...safeUser } = user

        return safeUser ;
    }

    async getUserByEmail(email: string): Promise<SafeUser> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Usuário não enconrado')
        }
        const { password: _, ...safeUser } = user

        return safeUser ;
    }

    async getUserByDocument(document: string): Promise<SafeUser> {
        const user = await this.userRepository.findByDocument(document)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }
        const { password: _, ...safeUser } = user

        return safeUser ;
    }


}