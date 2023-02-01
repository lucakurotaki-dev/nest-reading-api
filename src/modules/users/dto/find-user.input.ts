import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IFindUserInput {
  @Field(() => String)
  id: string;
}
