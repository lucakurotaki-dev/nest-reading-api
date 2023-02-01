import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ICreateUserInput } from './create-user.input';

@InputType()
export class IUpdateUserInput extends PartialType(ICreateUserInput) {
  @Field(() => String)
  id: string;
}
