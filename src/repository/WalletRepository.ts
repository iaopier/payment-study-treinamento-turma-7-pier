import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WalletRepository {
  async updateBalance(walletId: string, amount: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { id: walletId },
      });
      if (!wallet) throw new Error('Wallet not found');
      await tx.wallet.update({
        where: { id: walletId },
        data: { balance: { increment: amount } },
      });
    });
  }
}