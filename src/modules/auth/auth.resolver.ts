import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/auth.guard';
import { CurrentUser } from './guards/currentUser.guard';
import { LoginInput } from './input/auth.input';
import { IChangePasswordWithRecoveryTokenInput } from './input/changePasswordMobile.input';
import { IRequestRecoveryPasswordInput } from './input/request-recovery-password.input';
import { IVerifyRecoveryPasswordTokenInput } from './input/verify-recovery-password-token.input';
import { LoginResponse } from './response/login.response';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return this.authService.login(input);
  }

  @Mutation(() => Boolean)
  async requestRecoveryPassword(
    @Args('input') input: IRequestRecoveryPasswordInput,
  ): Promise<boolean> {
    return this.authService.requestRecoveryPassword(input);
  }

  @Mutation(() => Boolean)
  async verifyRecoveryPasswordToken(
    @Args('input') input: IVerifyRecoveryPasswordTokenInput,
  ): Promise<boolean> {
    return this.authService.verifyRecoveryPasswordToken(input);
  }

  @Mutation(() => Boolean)
  async changePasswordWithRecoveryToken(
    @Args('input') input: IChangePasswordWithRecoveryTokenInput,
  ): Promise<boolean> {
    return this.authService.changePasswordWithRecoveryToken(input);
  }
}
