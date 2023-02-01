import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ICreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
