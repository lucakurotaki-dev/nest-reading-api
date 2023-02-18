import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { appConfiguration } from './configurations/env/env.configuration';
import { validate } from './configurations/env/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './modules/global/global.module';
import { ReadingModule } from './modules/readings/reading.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
      validate,
      envFilePath: ['.development.env', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    GlobalModule,
    UserModule,
    ReadingModule,
    AuthModule,
  ],
})
export class AppModule {}
