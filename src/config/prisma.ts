import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import { PrismaClient } from '../prisma/generated/client.ts'; // Importa o Prisma Client
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Cria a piscina de conexões (pool) nativa do PostgreSQL usando a URL do .env
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Cria o adaptador que faz a ponte entre o Prisma e o driver do Postgres
const adapter = new PrismaPg(pool);

// 3. Inicializa o cliente injetando o adaptador
export const prisma = new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
});