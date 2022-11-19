import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { PrismaUserRepository } from './infrastructure/prisma/prisma-user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: Repository.USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}
