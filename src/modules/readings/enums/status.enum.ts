import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  INPROGRESS = 'IN PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

registerEnumType(Status, {
  name: 'Status',
});
