import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IAuthConfig } from 'src/configurations/authConfig';
import { EmailModule } from 'src/providers/EmailProvider/email.module';
import { NodeMailerEmailService } from 'src/providers/EmailProvider/nodemailer-email-service.provider';
import { UserModule } from '../users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { NestJWTToken } from './providers/JWTToken/nest-jwt-token.provider';
import { NumericTokenImpl } from './providers/NumericToken/numericToken.impl';

@Module({
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<IAuthConfig>('auth').jwt.secret,
        signOptions: {
          expiresIn: config.get<IAuthConfig>('auth').jwt.accessToken.expiresIn,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    {
      provide: 'JWTToken',
      useClass: NestJWTToken,
    },
    {
      provide: 'NumericToken',
      useClass: NumericTokenImpl,
    },
    {
      provide: 'EmailService',
      useClass: NodeMailerEmailService,
    },
  ],
})
export class AuthModule {}
