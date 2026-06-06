import { prisma } from '../config/prisma.ts'
import { Wallet } from '../prisma/generated/client.ts'

export class WalletRepository {

    async create(userId: string): Promise<Wallet | null> {
        return prisma.wallet.create({
            data: {
                userId,
                balance: 0
            }
        })
    }

    async findByUserId(userId: string): Promise<Wallet | null> {
        return prisma.wallet.findUnique({
            where: { userId }
        })
    }

    async findById(id: string): Promise<Wallet | null> {
        return prisma.wallet.findUnique({
            where: { id }
        })
    }

}