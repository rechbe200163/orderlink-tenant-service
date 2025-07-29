"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const payload_decorator_1 = require("@nestjs/microservices/decorators/payload.decorator");
const tenant_repository_1 = require("./tenant.repository");
const module_service_1 = require("./module.service");
let TenantService = class TenantService {
    tenantRepository;
    moduleService;
    constructor(tenantRepository, moduleService) {
        this.tenantRepository = tenantRepository;
        this.moduleService = moduleService;
    }
    create(createTenantDto) {
        return this.tenantRepository.create(createTenantDto);
    }
    findAll() {
        return `This action returns all tenant`;
    }
    findOne(id) {
        return `This action returns a #${id} tenant`;
    }
    remove(id) {
        return `This action removes a #${id} tenant`;
    }
    async createTenant(createTenantDto) {
        console.log('Creating tenant with data:', createTenantDto);
        const tenant = await this.tenantRepository.create(createTenantDto);
        await this.moduleService.enableDefaultModulesForTenant(tenant.tenantId);
        return tenant;
    }
};
exports.TenantService = TenantService;
__decorate([
    __param(0, (0, payload_decorator_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantService.prototype, "createTenant", null);
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_repository_1.TenantRepository,
        module_service_1.ModuleService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map