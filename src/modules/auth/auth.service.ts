import { Inject, Injectable } from '@nestjs/common';
import { IEmailService } from 'src/providers/EmailProvider/email-service.model';
import { UserService } from '../users/user.service';
import { IJWTToken } from './providers/JWTToken/jwt-token.model';
import { INumericToken } from './providers/NumericToken/numericToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject('JWTToken')
    private jwtToken: IJWTToken,
    @Inject('NumericToken')
    private numericToken: INumericToken,
    @Inject('EmailService')
    private emailService: IEmailService,
  ) {}
}
