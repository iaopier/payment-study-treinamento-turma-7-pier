import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateUserService {
  async execute(data: { name: string; email: string }) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data });
      await tx.wallet.create({
        data: { userId: user.id, balance: 0 },
      });
      return user;
    });
  }
}