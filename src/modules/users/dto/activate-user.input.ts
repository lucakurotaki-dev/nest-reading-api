import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IActivateUserInput {
  @Field(() => String)
  id: string;
}
