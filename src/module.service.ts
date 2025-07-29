import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleEnum } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class ModuleService implements OnModuleInit {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService
  ) {}

  async onModuleInit() {
    await this.seedModules();
  }

  private async seedModules() {
    const moduleNames = Object.values(ModuleEnum);
    for (const name of moduleNames) {
      await this.prisma.client.module.upsert({
        where: { name },
        create: { name },
        update: {},
      });
    }
  }

  async enableAllModulesForTenant(tenantId: string) {
    const modules = await this.prisma.client.module.findMany();
    for (const mod of modules) {
      await this.prisma.client.enabledModule.upsert({
        where: {
          tenantId_moduleName: {
            tenantId,
            moduleName: mod.name,
          },
        },
        create: {
          tenantId,
          moduleName: mod.name,
        },
        update: {},
      });
    }
  }

  async disableAllModulesForTenant(tenantId: string) {
    await this.prisma.client.enabledModule.deleteMany({
      where: { tenantId },
    });
  }
}
