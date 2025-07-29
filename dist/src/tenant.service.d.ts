import { TenantRepository } from './tenant.repository';
import { ModuleService } from './module.service';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly moduleService;
    constructor(tenantRepository: TenantRepository, moduleService: ModuleService);
    create(createTenantDto: {
        companyName: string;
        slug: string;
    }): Promise<{
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
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
    createTenant(createTenantDto: {
        companyName: string;
        slug: string;
    }): Promise<{
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
}
