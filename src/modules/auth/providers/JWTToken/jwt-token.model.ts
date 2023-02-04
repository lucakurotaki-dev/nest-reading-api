import { User } from 'src/modules/users/entities/user.entity';

export interface IJWTToken {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<User>;
  generateTokenAsync(
    payload: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<string>;
  verifyToken(token: string): Promise<void>;
  decodeToken(token: string): string | { [key: string]: any };
}
