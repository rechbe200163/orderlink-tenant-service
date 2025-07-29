import { TenantRepository } from './tenant.repository';
export declare class TenantService {
    private readonly tenantRepository;
    constructor(tenantRepository: TenantRepository);
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
        trialEndsAt: Date | null;
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
        trialEndsAt: Date | null;
        maxUsers: number;
        billingCustomerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
