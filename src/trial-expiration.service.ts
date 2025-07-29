import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomPrismaService } from 'nestjs-prisma';
import { ModuleService } from './module.service';

@Injectable()
export class TrialExpirationService {
  private readonly logger = new Logger(TrialExpirationService.name);

  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService,
    private readonly moduleService: ModuleService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const expiredTenants = await this.prisma.client.tenant.findMany({
      where: {
        status: 'TRIAL',
        trialEndsAt: { lte: new Date() },
      },
    });

    for (const tenant of expiredTenants) {
      this.logger.log(`Disabling modules for tenant ${tenant.tenantId}`);
      await this.moduleService.disableAllModulesForTenant(tenant.tenantId);
    }
  }
}
