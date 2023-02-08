import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IEmailService } from 'src/providers/EmailProvider/email-service.model';
import { UserService } from '../users/user.service';
import { LoginInput } from './input/auth.input';
import { IJWTToken } from './providers/JWTToken/jwt-token.model';
import { INumericToken } from './providers/NumericToken/numericToken.interface';
import { LoginResponse } from './response/login.response';
import { compareSync } from 'bcrypt';
import { IRefreshTokensRequest } from './request/refresh-tokens.request';
import { IRequestRecoveryPasswordRequest } from './request/request-recovery-password';
import { IVerifyRecoveryPasswordTokenInput } from './input/verifyCodeMobile.input';
import { IChangePasswordWithRecoveryTokenInput } from './input/changePasswordMobile.input';

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

  async login(data: LoginInput): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorreta.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('O usuário está desativado.');
    }

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Email ou senha incorreta.');
    }

    const accessToken = await this.jwtToken.generateAccessToken(user);
    const refreshToken = await this.jwtToken.generateRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens({
    refreshToken,
  }: IRefreshTokensRequest): Promise<LoginResponse> {
    await this.jwtToken.verifyToken(refreshToken);

    const decodedRefreshToken = await this.jwtToken.decodeToken(refreshToken);

    const user = await this.userService.findUserById({
      id: decodedRefreshToken['sub'],
    });

    if (user.refreshToken !== refreshToken) {
      throw new BadRequestException('O refresh koken é inválido.');
    }

    if (!user.isActive) {
      throw new BadRequestException('O usuário está desativado.');
    }

    const accessToken = await this.jwtToken.generateAccessToken(user);
    const newRefreshToken = await this.jwtToken.generateRefreshToken(user);

    await this.userService.updateRefreshTokenById({
      id: user.id,
      refreshToken: newRefreshToken,
    });

    return { user, accessToken, refreshToken: newRefreshToken };
  }

  async requestRecoveryPassword({
    email,
  }: IRequestRecoveryPasswordRequest): Promise<boolean> {
    const user = await this.userService.findUserByEmail({ email });

    if (!user) {
      throw new BadRequestException('O usuário não foi encontrado.');
    }

    const token = this.numericToken.generateNumericTokenWith5digits();

    await this.userService.updateRecoveryPasswordToken({
      email,
      recoveryPasswordToken: token,
    });

    await this.emailService.sendRecoveryPasswordEmail({
      to: email,
      token,
    });

    return true;
  }

  async verifyRecoveryPasswordToken({
    token,
    email,
  }: IVerifyRecoveryPasswordTokenInput): Promise<boolean> {
    const user = await this.userService.findByRecoveryPasswordTokenAndEmail({
      recoveryPasswordToken: token,
      email,
    });

    if (!user) {
      throw new BadRequestException('O token é inválido.');
    }

    return true;
  }

  async changePasswordWithRecoveryToken({
    password,
    email,
    recoveryPasswordToken,
  }: IChangePasswordWithRecoveryTokenInput): Promise<boolean> {
    const user = await this.userService.findByRecoveryPasswordTokenAndEmail({
      recoveryPasswordToken,
      email,
    });

    if (!user) {
      throw new BadRequestException('O token é inválido.');
    }

    await this.userService.changePasswordByEmail({ email, password });
    await this.userService.deleteRecoveryPasswordToken({ email });

    return true;
  }
}
