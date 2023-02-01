import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { PrismaUserRepository } from './infrastructure/prisma/prisma-user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    { provide: Repository.USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}
