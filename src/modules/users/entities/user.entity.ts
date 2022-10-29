import { BaseEntity } from 'src/modules/global/entities/base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
}
