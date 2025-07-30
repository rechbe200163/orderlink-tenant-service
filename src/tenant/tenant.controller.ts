import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @MessagePattern('create_tenant')
  create(@Payload() createTenantDto: { companyName: string; slug: string }) {
    console.log('Received create tenant request:', createTenantDto);
    return this.tenantService.createTenant(createTenantDto);
  }

  @MessagePattern('get_tenant_by_id')
  findOne(@Payload() { tenantId }: { tenantId: string }) {
    console.log('Received get tenant by ID request:', tenantId);
    return this.tenantService.findOne(tenantId);
  }
}
