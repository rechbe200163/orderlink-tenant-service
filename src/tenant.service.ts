import { Inject, Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { TenantRepository } from './tenant.repository';
import { ModuleService } from './module.service';
import { TenantDto } from './dto/tenant-entity.dto';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly moduleService: ModuleService
  ) {}

  async findOne(tenantId: string): Promise<TenantDto> {
    const tenant = await this.tenantRepository.findById(tenantId);
    return tenant as TenantDto;
  }

  async createTenant(createTenantDto: { companyName: string; slug: string }) {
    console.log('Creating tenant with data:', createTenantDto);
    const tenant = await this.tenantRepository.create(createTenantDto);
    await this.moduleService.enableDefaultModulesForTenant(tenant.tenantId);
    return tenant;
  }
}
