"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tenant_service_1 = require("./tenant.service");
describe('TenantService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [tenant_service_1.TenantService],
        }).compile();
        service = module.get(tenant_service_1.TenantService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tenant.service.spec.js.map