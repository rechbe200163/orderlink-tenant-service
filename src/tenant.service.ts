import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

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

  createTenant(
    @Payload() createTenantDto: { companyName: string; slug: string }
  ) {
    console.log('Creating tenant with data:', createTenantDto);
    return this.tenantRepository.create(createTenantDto);
  }
}
