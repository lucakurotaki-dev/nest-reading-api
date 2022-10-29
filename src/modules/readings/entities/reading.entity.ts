import { BaseEntity } from 'src/modules/global/entities/base.entity';
import { Status } from '../enums/status.enum';

export class Reading extends BaseEntity {
  userId: string;
  title: string;
  subtitle: string;
  tags: string;
  status?: Status;
  currentPage?: number;
}
