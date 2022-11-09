import { Injectable } from '@nestjs/common';
import { Reading } from '../../entities/reading.entity';
import { Status } from '../../enums/status.enum';
import { IReadingRepository } from '../../repositories/reading.repository';

@Injectable()
export class FakeReadingRepository implements IReadingRepository {
  private readings: Reading[];

  constructor() {
    this.reset();
  }

  public reset() {
    const reading = new Reading();

    Object.assign(reading, {
      id: '1',
      userId: '1',
      title: 'Title',
      subtitle: 'Subtitle',
      tags: '#tag',
      status: 'IN PROGRESS',
      currentPage: 1,
    });

    this.readings = [reading];
  }

  public async all(): Promise<Reading[]> {
    return this.readings;
  }

  public async create(input: Reading): Promise<Reading> {
    this.readings.push(input);

    return input;
  }

  public async findById(id: string): Promise<Reading> {
    const reading = this.readings.find((reading) => id === reading.id);

    if (!reading) {
      throw new Error('Leitura não encontrada.');
    }

    return reading;
  }

  public async setPage(readingId: string, page: number): Promise<Reading> {
    const reading = this.readings.find((reading) => readingId === reading.id);

    if (!reading) {
      throw new Error('Leitura não encontrada.');
    }

    reading.currentPage = page;

    return reading;
  }

  public async setStatus(readingId: string, status: Status): Promise<Reading> {
    const reading = this.readings.find((reading) => readingId === reading.id);

    if (!reading) {
      throw new Error('Leitura não encontrada.');
    }

    reading.status = status;

    return reading;
  }

  public async updateById(input: Reading): Promise<Reading> {
    const reading = this.readings.find((reading) => input.id === reading.id);

    if (!reading) {
      throw new Error('Leitura não encontrada.');
    }

    reading.title = input.title;
    reading.subtitle = input.subtitle;
    reading.tags = input.tags;

    return reading;
  }
  public async deleteById(id: string): Promise<boolean> {
    const index = this.readings.findIndex((reading) => id === reading.id);

    if (index < 0) {
      throw new Error('Leitura não encontrada.');
    }

    this.readings.splice(index, 1);

    return true;
  }
}
