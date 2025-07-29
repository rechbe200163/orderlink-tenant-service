import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepository } from './tenant.repository';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from 'prisma/prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
      isGlobal: true,
    }),
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
})
export class TenantModule {}
