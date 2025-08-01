import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'prisma/prisma.extension';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TenantRepository {
  constructor(
    // ✅ use `ExtendedPrismaClient` type for correct type-safety of your extended PrismaClient
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>
  ) {}

  async create(data: CreateTenantDto) {
    const existingTenant = await this.prismaService.client.tenant.findUnique({
      where: { companyName: data.companyName },
    });
    if (existingTenant) {
      throw new RpcException(
        `Tenant with company name ${data.companyName} already exists`
      );
    }
    return this.prismaService.client.tenant.create({
      data,
    });
  }

  async findById(tenantId: string) {
    const tenant = await this.prismaService.client.tenant.findUnique({
      where: { tenantId },
      select: {
        tenantId: true,
        backendUrl: true,
        status: true,
        trialStartedAt: true,
        trialEndsAt: true,
        maxEmployees: true,
        createdAt: true,
        updatedAt: true,
        enabledModules: {
          select: {
            moduleName: true,
          },
        },
      },
    });
    if (!tenant) {
      throw new RpcException(`Tenant with ID ${tenantId} not found`);
    }
    return tenant;
  }
}
