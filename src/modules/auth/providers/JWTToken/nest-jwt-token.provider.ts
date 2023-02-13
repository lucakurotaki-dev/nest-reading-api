import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthConfig } from 'src/configurations/authConfig';
import { User } from 'src/modules/users/entities/user.entity';
import { IJWTToken } from './jwt-token.model';

export class NestJWTToken implements IJWTToken {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.name,
    };

    return this.generateTokenAsync(payload, {
      expiresIn:
        this.configService.get<IAuthConfig>('auth').jwt.accessToken.expiresIn,
    });
  }

  generateRefreshToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.generateTokenAsync(payload, {
      expiresIn:
        this.configService.get<IAuthConfig>('auth').jwt.refreshToken.expiresIn,
    });
  }

  async generateTokenAsync(
    payload: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(payload, options);

    if (!token) {
      throw new BadRequestException('Falha ao gerar o JWT Token.');
    }

    return token;
  }

  async verifyToken(token: string): Promise<void> {
    await this.jwtService.verifyAsync(token).catch(() => {
      throw new UnauthorizedException('O token não é válido.');
    });
  }

  decodeToken(token: string): string | { [key: string]: any } {
    const decodedToken = this.jwtService.decode(token);

    if (!decodedToken) {
      throw new InternalServerErrorException('Falha ao decodificar o token.');
    }

    return decodedToken;
  }
}
