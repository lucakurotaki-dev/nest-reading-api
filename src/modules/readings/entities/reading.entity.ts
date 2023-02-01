import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/modules/global/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Status } from '../enums/status.enum';

@ObjectType()
@InputType('readingInput')
export class Reading extends BaseEntity {
  @Field(() => User)
  user?: User;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  tags?: string;

  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => Int, { nullable: true })
  currentPage?: number;

  public static fromPrismaModel(reading: any): Reading {
    return Object.assign(new Reading(), reading);
  }
}
