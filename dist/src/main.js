"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const tenant_module_1 = require("./tenant.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(tenant_module_1.TenantModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'tenant_queue',
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map