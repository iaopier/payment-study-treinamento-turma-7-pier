import { hash } from 'bcrypt';
import { UserRepository } from '../repository/UserRepository.ts'
import { WalletRepository } from '../repository/WalletRepository.ts'
import { User, Prisma } from '@prisma/client'

interface CreateUserRequest extends Prisma.UserCreateInput {}

export class CreateUserService {
    constructor(
        private userRepository: UserRepository,
        private walletRepository: WalletRepository
    ) {}

    async execute({fullName, document, userType, email, password}:CreateUserRequest): Promise<User> {

        const documentExists = await this.userRepository.findByDocument(document)
        if (documentExists) {
            throw new Error('Documento já cadastrado')
        }
        
        const emailExists = await this.userRepository.findByEmail(email) 
        if (emailExists) {
            throw new Error('Email já cadastrado')
        }

        const encryptedPassword = await hash(password, 10)

        const user = await this.userRepository.create({
            fullName,
            document,
            email,
            userType,
            password: encryptedPassword
        })

        await this.walletRepository.create(user.id)

        const { [password]: _, ...cleanUser } = user

        return cleanUser

    }

}