import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { PrismaReadingRepository } from './infrastructure/prisma/prisma-reading.repository';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';

@Module({
  controllers: [ReadingController],
  providers: [
    ReadingService,
    {
      provide: Repository.READING_REPOSITORY,
      useClass: PrismaReadingRepository,
    },
  ],
})
export class ReadingModule {}
