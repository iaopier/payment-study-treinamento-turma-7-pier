// src/controllers/UserController.ts
import { Request } from "express";
import { z } from "zod";
import {
  CreateUserInput,
  GetUserQuery,
  UpdateUserInput,
} from "@/types/user.types";
import UserService from "../services/UserService";

class UserController {
  private service: UserService;

  constructor(serviceInstance?: UserService) {
    this.service = serviceInstance || new UserService();
  }

  // GET /users - Listar usuários com paginação e filtros
  async get(req: Request, res: any): Promise<void> {
    const query = GetUserQuery.safeParse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      search: req.query.search ? String(req.query.search).trim() : null,
      role: req.query.role
        ? (req.query.role as "admin" | "user")
        : undefined,
    });

    if (!query.success) {
      return res.status(400).json({ error: query.error.errors[0].message });
    }

    const users = await this.service.get(query.data);
    
    // Paginação e formatação da resposta
    const totalPages = Math.ceil(users.length / 20);
    res.json({
      data: users,
      pagination: {
        page: query.data.page,
        limit: query.data.limit,
        total: users.length,
        pages: totalPages,
      },
    });
  }

  // GET /users/:id - Obter usuário específico
  async getOne(req: Request, res: any): Promise<void> {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    try {
      const user = await this.service.getOne(userId);
      
      // Se não encontrar, retorna 201 ou 404?
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  // POST /users - Criar novo usuário com validação Zod
  async post(req: Request, res: any): Promise<void> {
    const input = CreateUserInput.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
      await this.service.create(input.data);
      
      // Retorna 201 Created ou 200 OK?
      res.status(201).json({ message: "Usuário criado com sucesso", data: input.data });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      
      // Se erro de validação do banco, retorna 409
      if ((error as any).code === "P2025" || (error as any).message.includes("duplicate entry")) {
        return res.status(409).json({ error: "Usuário já existe com este email" });
      }
      
      // Erro genérico de servidor
      res.status(500).json({ error: "Erro interno ao criar usuário" });
    }
  }

  // PUT /users/:id - Atualizar usuário existente
  async put(req: Request, res: any): Promise<void> {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    try {
      await this.service.update(userId, req.body);
      
      // Retorna 200 OK ou 201?
      res.json({ message: "Usuário atualizado com sucesso", data: {} });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      
      if ((error as any).code === "P2025" || (error as any).message.includes("not found")) {
        return res.status(404).json({ error: "Usuário não encontrado para atualização" });
      }
      
      // Erro genérico de servidor
      res.status(500).json({ error: "Erro interno ao atualizar usuário" });
    }
  }
}

export default UserController;
