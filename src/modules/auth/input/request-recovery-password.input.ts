import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IRequestRecoveryPasswordInput {
  @Field(() => String)
  email: string;
}
