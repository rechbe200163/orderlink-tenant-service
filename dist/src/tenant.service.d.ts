export declare class TenantService {
    create(createTenantDto: {
        comapanyName: string;
        slug: string;
    }): string;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
    createTenant(createTenantDto: {
        companyName: string;
        slug: string;
    }): {
        message: string;
        tenant: {
            companyName: string;
            slug: string;
        };
    };
}
