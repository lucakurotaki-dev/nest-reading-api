import { ICrudRepository } from 'src/modules/global/crud.repository';
import { UpdateUserPasswordInput } from '../dto/update-user-password.input';
import { User } from '../entities/user.entity';

export interface IUserRepository extends ICrudRepository<User> {
  all(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  activateUser(id: string): Promise<User>;
  updatePhone(email: string, phone: string): Promise<User>;
  updateRefreshTokenById(id: string, refreshToken: string): Promise<boolean>;
  updateRecoveryPasswordTokenByEmail(
    email: string,
    token: string,
  ): Promise<void>;
  findByRecoveryPasswordTokenAndEmail(
    recoveryPasswordToken: string,
    email: string,
  ): Promise<User | null>;
  updatePasswordByEmail(data: UpdateUserPasswordInput): Promise<void>;
  deleteRecoveryPasswordTokenByEmail(email: string): Promise<void>;
}
