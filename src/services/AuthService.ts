import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key');
const ALG = 'HS256';

export class AuthService {
  static async generateToken(userId: string): Promise<string> {
    return await new SignJWT({ userId })
      .setProtectedHeader({ alg: ALG })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(SECRET);
  }

  static async verifyToken(token: string): Promise<{ userId: string }> {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { userId: string };
  }
}