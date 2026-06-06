import { prisma } from '../config/prisma.ts';
import { User, Prisma } from '../prisma/generated/client.ts';

export class UserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        })
    }

    async findByDocument(document: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { document },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        })
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        })
    }

}