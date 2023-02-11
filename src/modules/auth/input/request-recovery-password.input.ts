import { InputType } from '@nestjs/graphql';

@InputType()
export class IRequestRecoveryPasswordInput {
  email: string;
}
