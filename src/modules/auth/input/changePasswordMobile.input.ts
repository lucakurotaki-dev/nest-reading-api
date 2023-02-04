import { InputType } from '@nestjs/graphql';

@InputType()
export class IChangePasswordWithRecoveryTokenInput {
  email: string;
  password: string;
  recoveryPasswordToken: string;
}
