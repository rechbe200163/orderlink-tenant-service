import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepository } from './tenant.repository';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from 'prisma/prisma.extension';
import { ModuleService } from './module.service';
import { TrialExpirationService } from './trial-expiration.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [configuration],
    }),
  ],
  controllers: [TenantController],
  providers: [
    TenantService,
    TenantRepository,
    ModuleService,
    TrialExpirationService,
  ],
})
export class TenantModule {}
