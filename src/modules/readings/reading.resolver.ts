import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ICreateReadingInput } from './dto/create-reading.input';
import { IDeleteReadingInput } from './dto/delete-reading.input';
import { IFindReadingInput } from './dto/find-reading.input';
import { IUpdateReadingInput } from './dto/update-reading.input';
import { Reading } from './entities/reading.entity';
import { ReadingService } from './reading.service';

@Resolver('Reading')
export class ReadingResolver {
  constructor(private readonly readingService: ReadingService) {}

  @Query(() => [Reading])
  async findAllReadings(): Promise<Reading[]> {
    return this.readingService.allReadings();
  }

  @Query(() => Reading)
  async findReadingById(
    @Args('input') input: IFindReadingInput,
  ): Promise<Reading> {
    return this.readingService.findReadingById(input);
  }

  @Mutation(() => Reading)
  async createReading(
    @Args('input') input: ICreateReadingInput,
  ): Promise<Reading> {
    return this.readingService.createReading(input);
  }

  @Mutation(() => Reading)
  async updateReading(
    @Args('input') input: IUpdateReadingInput,
  ): Promise<Reading> {
    return this.readingService.updateReading(input);
  }

  @Mutation(() => Boolean)
  async deleteReading(
    @Args('input') input: IDeleteReadingInput,
  ): Promise<boolean> {
    return this.readingService.deleteReading(input);
  }
}
