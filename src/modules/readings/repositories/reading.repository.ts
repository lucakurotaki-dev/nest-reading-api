import { ICrudRepository } from 'src/modules/global/crud.repository';
import { Reading } from '../entities/reading.entity';

export interface IReadingRepository extends ICrudRepository<Reading> {
  all(): Promise<Reading[]>;
  setPage(readingId: string, page: number): Promise<Reading>;
  setStatus(readingId: string, status: unknown): Promise<Reading>;
}
