import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserPasswordInput {
  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não foi preenchido.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo password não foi preenchido. ' })
  password: string;
}
