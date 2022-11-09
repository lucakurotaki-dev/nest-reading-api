import { Status } from '../enums/status.enum';

export interface ISetStatusInput {
  readingId: string;
  status: Status;
}
