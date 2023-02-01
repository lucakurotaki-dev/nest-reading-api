import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ICreateReadingInput } from './create-reading.input';

@InputType()
export class IUpdateReadingInput extends PartialType(ICreateReadingInput) {
  @Field(() => String)
  id: string;
}
