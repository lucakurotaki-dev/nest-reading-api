import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { FakeUserRepository } from './infrastructure/fake/fake-user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: Repository.USER_REPOSITORY, useClass: FakeUserRepository },
  ],
})
export class UserModule {}
