import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IVerifyRecoveryPasswordTokenInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  email: string;
}
