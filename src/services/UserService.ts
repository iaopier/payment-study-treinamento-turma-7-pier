// src/services/UserService.ts
import { PrismaClient } from "@/prisma/client";
import {
  CreateUserInput,
  GetUserQuery,
  UpdateUserInput,
} from "@/types/user.types";
import UserRepository from "../repositories/UserRepository";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // GET /users - Listar usuários com paginação e filtros
  async get(queryData?: GetUserQuery): Promise<any[]> {
    const { page, limit, search, role } = queryData;

    if (!page || !limit) {
      return [];
    }

    // Paginação via offset/limit
    const skip = (page - 1) * limit;
    
    let users: any[] = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      skip, // Paginação
      take: limit as number,
    });

    if (search) {
      users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
        where: {
          OR: [
            { email: { contains: search } },
            { name: { contains: search } },
          ],
        },
      });
    }

    if (role) {
      users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
        where: { role },
      });
    }

    return users;
  }

  // GET /users/:id - Obter usuário específico
  async getOne(id: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  // POST /users - Criar novo usuário com validação de banco
  async create(data: CreateUserInput): Promise<void> {
    const { email, name } = data;

    if (!email || !name) {
      throw new Error("Email e nome são obrigatórios");
    }

    // Validação do Prisma (duplo check para evitar erro silencioso)
    await this.prisma.user.create({
      data: { email, name },
    });
  }

  // PUT /users/:id - Atualizar usuário existente
  async update(id: string, inputData: UpdateUserInput): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("Usuário não encontrado para atualização");
    }

    // Validação de campos obrigatórios no update
    const requiredFields: string[] = [];
    
    for (const [key, value] of Object.entries(inputData)) {
      if (!value) continue; // Ignorar valores vazio/undefined
      
      switch (key as keyof UpdateUserInput) {
        case "email":
          requiredFields.push("email");
          break;
        case "name":
          requiredFields.push("name");
          break;
        default:
          // Campos opcionais
          if (!value && !requiredFields.includes(key as keyof UpdateUserInput)) {
            continue; // Ignorar campos vazio/undefined
          }
      }
    }

    await this.prisma.user.update({
      where: { id },
      data: input,
    });
  }
}

export default UserService;
