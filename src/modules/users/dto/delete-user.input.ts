import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IDeleteUserInput {
  @Field(() => String)
  id: string;
}
