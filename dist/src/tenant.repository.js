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
exports.TenantRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const microservices_1 = require("@nestjs/microservices");
let TenantRepository = class TenantRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(data) {
        const existingTenant = await this.prismaService.client.tenant.findUnique({
            where: { companyName: data.companyName },
        });
        if (existingTenant) {
            throw new microservices_1.RpcException(`Tenant with company name ${data.companyName} already exists`);
        }
        return this.prismaService.client.tenant.create({
            data,
        });
    }
    async findById(tenantId) {
        const tenant = await this.prismaService.client.tenant.findUnique({
            where: { tenantId },
            select: {
                tenantId: true,
                backendUrl: true,
                status: true,
                trialStartedAt: true,
                trialEndsAt: true,
                maxUsers: true,
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
            throw new microservices_1.RpcException(`Tenant with ID ${tenantId} not found`);
        }
        return tenant;
    }
};
exports.TenantRepository = TenantRepository;
exports.TenantRepository = TenantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PrismaService')),
    __metadata("design:paramtypes", [nestjs_prisma_1.CustomPrismaService])
], TenantRepository);
//# sourceMappingURL=tenant.repository.js.map