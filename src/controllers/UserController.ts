import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const UserController = {
  async handleSensitiveAction(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token missing' });
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return res.status(200).json({ message: 'Success' });
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  }
};