import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '../enums/status.enum';

@InputType()
export class ICreateReadingInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => Int, { nullable: true })
  currentPage?: number;
}
