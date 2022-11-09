import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IActivateAccountInput } from './dto/activate-account.input';
import { ICreateUserInput } from './dto/create-user.input';
import { IDeleteUserInput } from './dto/delete-user.input';
import { IFindUserInput } from './dto/find-user.input';
import { IUpdatePhoneInput } from './dto/update-phone.input';
import { IUpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string): Promise<User> {
    const input: IFindUserInput = { id };
    return await this.userService.findUserById(input);
  }

  @Post()
  public async createUser(@Body() input: ICreateUserInput): Promise<User> {
    const id = Math.floor(Math.random() * 10000000).toString();

    const data: User = { id, ...input };

    return await this.userService.createUser(data);
  }

  @Put('activate')
  public async activateAccount(
    @Body() input: IActivateAccountInput,
  ): Promise<User> {
    return await this.userService.activateAccount(input);
  }

  @Put('update-phone')
  public async updatePhone(@Body() input: IUpdatePhoneInput): Promise<User> {
    return await this.userService.updatePhone(input);
  }

  @Put('update')
  public async updateUser(@Body() input: IUpdateUserInput): Promise<User> {
    return await this.userService.updateUser(input);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<boolean> {
    const input: IDeleteUserInput = { id };
    return await this.userService.deleteUser(input);
  }
}
