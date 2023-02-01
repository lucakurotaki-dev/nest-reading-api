import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IUpdatePhoneInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}
