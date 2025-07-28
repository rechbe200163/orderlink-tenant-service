import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    create(createTenantDto: CreateTenantDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateTenantDto: UpdateTenantDto): any;
    remove(id: string): any;
}
