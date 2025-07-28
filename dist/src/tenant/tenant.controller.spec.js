"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tenant_controller_1 = require("../tenant.controller");
const tenant_service_1 = require("./tenant.service");
describe('TenantController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [tenant_controller_1.TenantController],
            providers: [tenant_service_1.TenantService],
        }).compile();
        controller = module.get(tenant_controller_1.TenantController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=tenant.controller.spec.js.map