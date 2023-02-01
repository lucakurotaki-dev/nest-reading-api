import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/PrismaService/prisma.service';
import { ICreateUserRequest } from '../../dto/create-user.request';
import { IUpdateUserRequest } from '../../dto/update-user.request';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async all(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: { readings: true },
    });

    return users.map(User.fromPrismaModel);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { readings: true },
    });

    return user ? User.fromPrismaModel(user) : null;
  }

  async activateUser(id: string): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { isActive: true },
    });

    return User.fromPrismaModel(user);
  }

  async updatePhone(email: string, phone: string): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { email },
      data: { phone: phone },
    });

    return User.fromPrismaModel(user);
  }

  async create(input: ICreateUserRequest): Promise<User> {
    const user = await this.prismaService.user.create({ data: input });

    return User.fromPrismaModel(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { readings: true },
    });

    return user ? User.fromPrismaModel(user) : null;
  }

  async updateById(input: IUpdateUserRequest): Promise<User> {
    const { id } = input;
    const user = await this.prismaService.user.update({
      where: { id },
      data: input,
      include: { readings: true },
    });

    return User.fromPrismaModel(user);
  }

  async deleteById(id: string): Promise<boolean> {
    await this.prismaService.user.delete({ where: { id } });

    return true;
  }
}
