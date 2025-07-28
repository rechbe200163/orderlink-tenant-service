import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class TenantService {
  create(createTenantDto: { comapanyName: string; slug: string }) {
    return 'This action adds a new tenant';
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
    console.log('Received create_tenant message:', createTenantDto);
    return {
      message: 'Tenant created successfully',
      tenant: createTenantDto,
    };
  }
}
