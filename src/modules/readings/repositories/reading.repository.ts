import { ICrudRepository } from 'src/modules/global/crud.repository';
import { Reading } from '../entities/reading.entity';

export interface IReadingRepository extends ICrudRepository<Reading> {
  all(): Promise<Reading[]>;
}
