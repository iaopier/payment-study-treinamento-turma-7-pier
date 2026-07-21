fix: corrige src/repository/WalletRepository.ts (QA human review #1)

Implementação de transação atômica usando Prisma para garantir consistência no saldo, com injeção de dependência do PrismaClient.