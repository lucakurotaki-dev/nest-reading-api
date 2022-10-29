import { ICrudRepository } from 'src/modules/global/crud.repository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends ICrudRepository<User> {
  all(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  activateAccount(id: string): Promise<User>;
  updatePhone(email: string, phone: string): Promise<User>;
}
