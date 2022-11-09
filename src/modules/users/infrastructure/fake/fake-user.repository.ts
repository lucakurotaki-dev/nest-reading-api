import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

@Injectable()
export class FakeUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.reset();
  }

  public reset() {
    const user = new User();

    Object.assign(user, {
      id: '1',
      name: 'Name',
      email: 'email@email.com',
      phone: '(99)99999-9999',
      password: 'password',
      isActive: true,
    });

    this.users = [user];
  }

  public async all(): Promise<User[]> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => email == user.email);
  }

  public async activateAccount(email: string): Promise<User> {
    const user = this.users.find((user) => email == user.email);

    user.isActive = true;

    return user;
  }

  public async updatePhone(email: string, phone: string): Promise<User> {
    const user = this.users.find((user) => email == user.email);

    user.phone = phone;

    return user;
  }

  public async create(input: User): Promise<User> {
    this.users.push(input);

    return input;
  }

  public async findById(id: string): Promise<User> {
    const user = this.users.find((user) => id == user.id);

    return user;
  }

  public async updateById(input: User): Promise<User> {
    const user = this.users.find((user) => input.id == user.id);

    user.email = input.email;
    user.name = input.name;
    user.password = input.password;
    user.phone = input.password;

    return user;
  }

  public async deleteById(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => id == user.id);

    this.users.splice(index, 1);

    return true;
  }
}
