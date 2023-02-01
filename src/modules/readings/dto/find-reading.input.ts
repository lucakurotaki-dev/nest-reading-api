import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IFindReadingInput {
  @Field(() => String)
  id: string;
}
