import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { ICreateReadingRequest } from './dto/create-reading.request';
import { IDeleteReadingRequest } from './dto/delete-reading.request';
import { IFindReadingRequest } from './dto/find-reading.request';
import { ISetPageRequest } from './dto/set-page.request';
import { ISetStatusRequest } from './dto/set-status.request';
import { IUpdateReadingRequest } from './dto/update-reading.request';
import { Reading } from './entities/reading.entity';
import { IReadingRepository } from './repositories/reading.repository';

@Injectable()
export class ReadingService {
  constructor(
    @Inject(Repository.READING_REPOSITORY)
    private redingRepository: IReadingRepository,
  ) {}

  public async allReadings(): Promise<Reading[]> {
    return await this.redingRepository.all();
  }

  public async findReadingById(data: IFindReadingRequest): Promise<Reading> {
    const reading = await this.redingRepository.findById(data.id);

    if (!reading) {
      throw new BadRequestException('Leitura não encontrada.');
    }

    return reading;
  }

  public async createReading(data: ICreateReadingRequest): Promise<Reading> {
    const reading = await this.redingRepository.create(data);

    if (!reading) {
      throw new BadRequestException('A leitura não foi salva corretamente.');
    }

    return reading;
  }

  public async updateReading(data: IUpdateReadingRequest): Promise<Reading> {
    const reading = await this.redingRepository.updateById(data);

    if (!reading) {
      throw new BadRequestException('A leitura não foi alterada corretamente.');
    }

    return reading;
  }

  public async setPage(data: ISetPageRequest): Promise<Reading> {
    const reading = await this.redingRepository.setPage(
      data.readingId,
      data.page,
    );

    return reading;
  }

  public async setStatus(data: ISetStatusRequest): Promise<Reading> {
    const reading = await this.redingRepository.setStatus(
      data.readingId,
      data.status,
    );

    return reading;
  }

  public async deleteReading(data: IDeleteReadingRequest): Promise<boolean> {
    const isDeleted = await this.redingRepository.deleteById(data.id);

    return isDeleted;
  }
}
