import crypto from 'crypto';

export class CreateUserService {
  async execute(email: string) {
    const temporaryPassword = crypto.randomBytes(8).toString('hex');
    return {
      email,
      temporaryPassword,
      createdAt: new Date()
    };
  }
}