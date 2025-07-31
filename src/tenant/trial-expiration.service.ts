import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'prisma/prisma.extension';
import { TenantStatus } from '@prisma/client';
import { ModuleService } from './module.service';

@Injectable()
export class TrialExpirationService {
  private readonly logger = new Logger(TrialExpirationService.name);

  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly moduleService: ModuleService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const expiredTenants = await this.prismaService.client.tenant.findMany({
      where: {
        status: TenantStatus.TRIAL,
        trialEndsAt: { lte: new Date() },
      },
    });

    for (const tenant of expiredTenants) {
      this.logger.log(`Disabling modules for tenant ${tenant.tenantId}`);
      await this.moduleService.disableAllModulesForTenant(tenant.tenantId);
    }
  }
}
