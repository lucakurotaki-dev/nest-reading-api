import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GlobalModule } from './modules/global/global.module';
import { ReadingModule } from './modules/readings/reading.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    ReadingModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
