import { Status } from '../enums/status.enum';

export interface ISetStatusRequest {
  readingId: string;
  status: Status;
}
