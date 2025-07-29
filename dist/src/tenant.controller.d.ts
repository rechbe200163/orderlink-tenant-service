import { TenantService } from './tenant.service';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
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
    findOne(id: string): string;
    remove(id: string): string;
}
