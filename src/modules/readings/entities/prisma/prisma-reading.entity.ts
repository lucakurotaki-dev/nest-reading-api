import { Reading } from '../reading.entity';

export class PrismaReading extends Reading {
  public static fromPrismaModel(reading: any): Reading {
    return Object.assign(new Reading(), reading);
  }
}
