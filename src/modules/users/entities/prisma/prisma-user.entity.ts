import { User } from '../user.entity';

export class PrismaUser extends User {
  public static fromPrismaModel(user: any): User {
    return Object.assign(new User(), user);
  }
}
