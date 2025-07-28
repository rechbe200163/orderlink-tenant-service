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
const microservices_1 = require("@nestjs/microservices");
let TenantService = class TenantService {
    create(createTenantDto) {
        return 'This action adds a new tenant';
    }
    findAll() {
        return `This action returns all tenant`;
    }
    findOne(id) {
        return `This action returns a #${id} tenant`;
    }
    update(id, updateTenantDto) {
        return `This action updates a #${id} tenant`;
    }
    remove(id) {
        return `This action removes a #${id} tenant`;
    }
    createTenant(createTenantDto) {
        console.log('Received create_tenant message:', createTenantDto);
    }
};
exports.TenantService = TenantService;
__decorate([
    (0, microservices_1.MessagePattern)('create_tenant'),
    __param(0, (0, payload_decorator_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantService.prototype, "createTenant", null);
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)()
], TenantService);
//# sourceMappingURL=tenant.service.js.map