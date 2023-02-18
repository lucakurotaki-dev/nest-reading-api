import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IChangePasswordWithRecoveryTokenInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  recoveryPasswordToken: string;
}
