import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICreateReadingInput } from './dto/create-reading.input';
import { ISetPageInput } from './dto/set-page.input';
import { ISetStatusInput } from './dto/set-status.input';
import { IUpdateReadingInput } from './dto/update-reading.input';
import { Reading } from './entities/reading.entity';
import { ReadingService } from './reading.service';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get()
  public async findAll(): Promise<Reading[]> {
    return await this.readingService.allReadings();
  }

  @Get(':id')
  public async findReadingById(@Param('id') id: string): Promise<Reading> {
    const input = { id };
    return await this.readingService.findReadingById(input);
  }

  @Post()
  public async createReading(
    @Body() input: ICreateReadingInput,
  ): Promise<Reading> {
    const id = Math.floor(Math.random() * 10000000).toString();
    const data: Reading = { id, ...input };

    return await this.readingService.createReading(data);
  }

  @Put('update')
  public async updateReading(
    @Body() input: IUpdateReadingInput,
  ): Promise<Reading> {
    return await this.readingService.updateReading(input);
  }

  @Put('set-page')
  public async setPage(@Body() input: ISetPageInput): Promise<Reading> {
    return await this.readingService.setPage(input);
  }

  @Put('set-status')
  public async setStatus(@Body() input: ISetStatusInput): Promise<Reading> {
    return await this.readingService.setStatus(input);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<boolean> {
    const input = { id };
    return await this.readingService.deleteReading(input);
  }
}
