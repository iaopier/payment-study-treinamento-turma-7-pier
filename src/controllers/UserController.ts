import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserService } from '../services/GetUserService';
export class UserController {
  async create(req: Request, res: Response) {
    const service = new CreateUserService();
    const user = await service.execute(req.body);
    return res.status(201).json(user);
  }
  async show(req: Request, res: Response) {
    const service = new GetUserService();
    const user = await service.execute(req.params.id);
    return res.json(user);
  }
}