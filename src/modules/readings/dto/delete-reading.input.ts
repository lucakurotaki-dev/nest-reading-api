import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IDeleteReadingInput {
  @Field(() => String)
  id: string;
}
