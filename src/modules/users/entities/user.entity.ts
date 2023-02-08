import { BaseEntity } from 'src/modules/global/entities/base.entity';
import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { Reading } from 'src/modules/readings/entities/reading.entity';

@ObjectType()
@InputType('userInput')
export class User extends BaseEntity {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @HideField()
  password: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @HideField()
  resetPassword: string;

  @HideField()
  refreshToken: string;

  @Field(() => [Reading])
  readings: Reading[];

  public static fromPrismaModel(user: any): User {
    return Object.assign(new User(), user);
  }
}
