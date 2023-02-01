import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IActivateUserInput } from './dto/activate-user.input';
import { ICreateUserInput } from './dto/create-user.input';
import { IDeleteUserInput } from './dto/delete-user.input';
import { IFindUserInput } from './dto/find-user.input';
import { IUpdatePhoneInput } from './dto/update-phone.input';
import { IUpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return this.userService.allUsers();
  }

  @Query(() => User)
  async findUserById(@Args('input') input: IFindUserInput): Promise<User> {
    return this.userService.findUserById(input);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: ICreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async activateUser(@Args('input') input: IActivateUserInput): Promise<User> {
    return this.userService.activateUser(input);
  }

  @Mutation(() => User)
  async updatePhone(@Args('input') input: IUpdatePhoneInput): Promise<User> {
    return this.userService.updatePhone(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: IUpdateUserInput): Promise<User> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('input') input: IDeleteUserInput): Promise<boolean> {
    return this.userService.deleteUser(input);
  }
}
