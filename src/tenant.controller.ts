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
    return this.tenantService.createTenant(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
