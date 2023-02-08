import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { IActivateUserRequest } from './dto/activate-user.request';
import { IChangePasswordRequest } from './dto/change-password.request';
import { ICreateUserRequest } from './dto/create-user.request';
import { IDeleteUserRecoveryPasswordRequest } from './dto/delete-recovery-password.request';
import { IDeleteUserRequest } from './dto/delete-user.request';
import { IFindUserByRecoveryPasswordTokenAndEmailRequest } from './dto/find-by-token-and-email.request';
import { IFindUserByEmailRequest } from './dto/find-user-by-email.request';
import { IFindUserRequest } from './dto/find-user.request';
import { IUpdatePhoneRequest } from './dto/update-phone.request';
import { IUpdateRefreshTokenRequest } from './dto/update-refresh-token.request';
import { IUpdateUserRecoveryPasswordToken } from './dto/update-user-reset-password.request';
import { IUpdateUserRequest } from './dto/update-user.request';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(Repository.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  public async allUsers(): Promise<User[]> {
    return await this.userRepository.all();
  }

  public async findUserByEmail(data: IFindUserByEmailRequest): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return user;
  }

  public async findUserById(data: IFindUserRequest): Promise<User> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  public async createUser(data: ICreateUserRequest): Promise<User> {
    const foundUser = await this.userRepository.findByEmail(data.email);

    if (foundUser) {
      throw new BadRequestException('Já existe uma conta com este email.');
    }

    const user = await this.userRepository.create(data);

    if (!user) {
      throw new InternalServerErrorException(
        'O usuário não foi salvo corretamente.',
      );
    }

    return user;
  }

  public async activateUser(data: IActivateUserRequest): Promise<User> {
    const user = await this.userRepository.activateUser(data.id);

    return user;
  }

  public async updatePhone(data: IUpdatePhoneRequest): Promise<User> {
    const user = await this.userRepository.updatePhone(data.email, data.phone);

    return user;
  }

  public async updateUser(data: IUpdateUserRequest): Promise<User> {
    const foundUser = await this.userRepository.findById(data.id);

    if (!foundUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const user = await this.userRepository.updateById(data);

    if (!user) {
      throw new InternalServerErrorException(
        'O usuário não foi alterado corretamente.',
      );
    }

    return user;
  }

  public async deleteUser(data: IDeleteUserRequest): Promise<boolean> {
    const foundUser = await this.userRepository.findById(data.id);

    if (!foundUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    await this.userRepository.deleteById(data.id);

    return true;
  }

  public async updateRefreshTokenById({
    id,
    refreshToken,
  }: IUpdateRefreshTokenRequest) {
    await this.userRepository.updateRefreshTokenById(id, refreshToken);
  }

  public async updateRecoveryPasswordToken(
    data: IUpdateUserRecoveryPasswordToken,
  ): Promise<void> {
    await this.userRepository.updateRecoveryPasswordTokenByEmail(
      data.email,
      data.recoveryPasswordToken,
    );
  }

  public async findByRecoveryPasswordTokenAndEmail({
    email,
    recoveryPasswordToken,
  }: IFindUserByRecoveryPasswordTokenAndEmailRequest): Promise<User | null> {
    return this.userRepository.findByRecoveryPasswordTokenAndEmail(
      recoveryPasswordToken,
      email,
    );
  }

  public async changePasswordByEmail(
    data: IChangePasswordRequest,
  ): Promise<void> {
    const { email, password } = data;

    await this.findUserByEmail({ email });

    await this.userRepository.updatePasswordByEmail({
      email,
      password,
    });

    await this.deleteRecoveryPasswordToken({ email });
  }

  public async deleteRecoveryPasswordToken(
    data: IDeleteUserRecoveryPasswordRequest,
  ): Promise<boolean> {
    await this.findUserByEmail(data);

    await this.userRepository.deleteRecoveryPasswordTokenByEmail(data.email);

    return true;
  }
}
