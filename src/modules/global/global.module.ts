import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/providers/PrismaService/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalModule {}
