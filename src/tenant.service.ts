import { Inject, Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { TenantRepository } from './tenant.repository';
import { ModuleService } from './module.service';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly moduleService: ModuleService
  ) {}

  create(createTenantDto: { companyName: string; slug: string }) {
    return this.tenantRepository.create(createTenantDto);
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }

  async createTenant(
    @Payload() createTenantDto: { companyName: string; slug: string }
  ) {
    console.log('Creating tenant with data:', createTenantDto);
    const tenant = await this.tenantRepository.create(createTenantDto);
    await this.moduleService.enableAllModulesForTenant(tenant.tenantId);
    return tenant;
  }
}
