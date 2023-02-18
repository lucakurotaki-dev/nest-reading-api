import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { IUserRepository } from '../users/repositories/user.repository';
import { ICreateReadingRequest } from './dto/create-reading.request';
import { IDeleteReadingRequest } from './dto/delete-reading.request';
import { IFindReadingRequest } from './dto/find-reading.request';
import { IUpdateReadingRequest } from './dto/update-reading.request';
import { Reading } from './entities/reading.entity';
import { IReadingRepository } from './repositories/reading.repository';

@Injectable()
export class ReadingService {
  constructor(
    @Inject(Repository.READING_REPOSITORY)
    private redingRepository: IReadingRepository,
    @Inject(Repository.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
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
    const currentUser = await this.userRepository.findById(data.userId);

    if (!currentUser) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const reading = await this.redingRepository.create(data);

    if (!reading) {
      throw new BadRequestException('A leitura não foi salva corretamente.');
    }

    return reading;
  }

  public async updateReading({
    userId,
    ...data
  }: IUpdateReadingRequest): Promise<Reading> {
    const reading = await this.findReadingById({ id: data.id });

    if (reading.user.id != userId) {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    const updatedReading = await this.redingRepository.updateById(data);

    if (!updatedReading) {
      throw new BadRequestException('A leitura não foi alterada corretamente.');
    }

    return updatedReading;
  }

  public async deleteReading({
    id,
    userId,
  }: IDeleteReadingRequest): Promise<boolean> {
    const reading = await this.findReadingById({ id });

    if (reading.user.id != userId) {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    const isDeleted = await this.redingRepository.deleteById(id);

    return isDeleted;
  }
}
