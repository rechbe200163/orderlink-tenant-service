"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('OrderLink Tenant Service API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: 'mqtt://localhost:1883',
        },
    });
    await app.startAllMicroservices();
    await app.listen(3003);
    await microservice.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map