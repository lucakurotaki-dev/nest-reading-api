import { Status } from '../enums/status.enum';

export interface ICreateReadingRequest {
  userId?: string;
  title: string;
  subtitle: string;
  tags?: string;
  status?: Status;
  currentPage?: number;
}
