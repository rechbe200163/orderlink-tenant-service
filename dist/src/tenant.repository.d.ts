import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'prisma/prisma.extension';
import { CreateTenantDto } from './dto/create-tenant.dto';
export declare class TenantRepository {
    private prismaService;
    constructor(prismaService: CustomPrismaService<ExtendedPrismaClient>);
    create(data: CreateTenantDto): Promise<{
        tenantId: string;
        companyName: string;
        slug: string;
        backendUrl: string | null;
        status: import("@prisma/client").$Enums.TenantStatus;
        trialStartedAt: Date;
        trialEndsAt: Date;
        maxUsers: number;
        billingCustomerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(tenantId: string): Promise<{
        tenantId: string;
        backendUrl: string | null;
        status: import("@prisma/client").$Enums.TenantStatus;
        trialStartedAt: Date;
        trialEndsAt: Date;
        maxUsers: number;
        createdAt: Date;
        updatedAt: Date;
        enabledModules: {
            moduleName: import("@prisma/client").$Enums.ModuleEnum;
        }[];
    }>;
}
