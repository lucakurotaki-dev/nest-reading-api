import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthConfig } from 'src/configurations/authConfig';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<IAuthConfig>('auth').jwt.secret,
    });
  }

  async validate(payload: { sub: User['id'] }) {
    const user = await this.userService.findUserById({
      id: payload.sub,
    });

    if (!user) {
      throw new UnauthorizedException('Acesso não autorizado.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('O usuário está desativado.');
    }

    return user;
  }
}
