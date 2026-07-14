import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/AuthService';
import { prisma } from '../lib/prisma';

export class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = await AuthService.generateToken(user.id);
    return res.status(200).json({ token, user: { id: user.id, email: user.email } });
  }
}