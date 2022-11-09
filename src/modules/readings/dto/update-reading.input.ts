import { Status } from '../enums/status.enum';

export interface IUpdateReadingInput {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  tags: string;
  status?: Status;
  currentPage?: number;
}
