import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class BaseEntity {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date)
  deletedAt?: Date;
}
