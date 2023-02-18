import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/guards/currentUser.guard';
import { User } from '../users/entities/user.entity';
import { ICreateReadingInput } from './dto/create-reading.input';
import { IDeleteReadingInput } from './dto/delete-reading.input';
import { IFindReadingInput } from './dto/find-reading.input';
import { IUpdateReadingInput } from './dto/update-reading.input';
import { Reading } from './entities/reading.entity';
import { ReadingService } from './reading.service';

@UseGuards(GqlAuthGuard)
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
    @CurrentUser() user: User,
  ): Promise<Reading> {
    return this.readingService.createReading({ userId: user.id, ...input });
  }

  @Mutation(() => Reading)
  async updateReading(
    @Args('input') input: IUpdateReadingInput,
    @CurrentUser() user: User,
  ): Promise<Reading> {
    return this.readingService.updateReading({ userId: user.id, ...input });
  }

  @Mutation(() => Boolean)
  async deleteReading(
    @Args('input') input: IDeleteReadingInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.readingService.deleteReading({ userId: user.id, ...input });
  }
}
