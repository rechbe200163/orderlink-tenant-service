import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TenantModule } from './tenant.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Optionally test Swagger UI
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3001);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(TenantModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'tenant_queue',
      },
    }); // HTTP App
  await microservice.listen();
}
bootstrap();
