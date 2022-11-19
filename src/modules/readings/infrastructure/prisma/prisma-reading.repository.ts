import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/PrismaService/prisma.service';
import { ICreateReadingRequest } from '../../dto/create-reading.request';
import { IUpdateReadingRequest } from '../../dto/update-reading.request';
import { PrismaReading } from '../../entities/prisma/prisma-reading.entity';
import { Reading } from '../../entities/reading.entity';
import { Status } from '../../enums/status.enum';
import { IReadingRepository } from '../../repositories/reading.repository';

@Injectable()
export class PrismaReadingRepository implements IReadingRepository {
  constructor(private prismaService: PrismaService) {}

  async all(): Promise<Reading[]> {
    const readings = await this.prismaService.reading.findMany({
      include: { user: true },
    });

    return readings.map(PrismaReading.fromPrismaModel);
  }

  async setPage(readingId: string, page: number): Promise<Reading> {
    const reading = await this.prismaService.reading.update({
      where: { id: readingId },
      data: { currentPage: page },
    });

    return PrismaReading.fromPrismaModel(reading);
  }

  async setStatus(readingId: string, status: Status): Promise<Reading> {
    const reading = await this.prismaService.reading.update({
      where: { id: readingId },
      data: { status: status },
    });

    return PrismaReading.fromPrismaModel(reading);
  }

  async create(input: ICreateReadingRequest): Promise<Reading> {
    const reading = await this.prismaService.reading.create({
      data: input,
    });

    return PrismaReading.fromPrismaModel(reading);
  }

  async findById(id: string): Promise<Reading> {
    const reading = await this.prismaService.reading.findUnique({
      where: { id },
      include: { user: true },
    });

    return reading ? PrismaReading.fromPrismaModel(reading) : null;
  }

  async updateById(input: IUpdateReadingRequest): Promise<Reading> {
    const { id } = input;
    const reading = await this.prismaService.reading.update({
      where: { id },
      data: input,
    });

    return PrismaReading.fromPrismaModel(reading);
  }

  async deleteById(id: string): Promise<boolean> {
    await this.prismaService.reading.delete({
      where: { id },
    });

    return true;
  }
}
