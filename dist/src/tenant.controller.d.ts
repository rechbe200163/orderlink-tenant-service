import { TenantService } from './tenant.service';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    create(createTenantDto: {
        companyName: string;
        slug: string;
    }): {
        message: string;
        tenant: {
            companyName: string;
            slug: string;
        };
    };
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
