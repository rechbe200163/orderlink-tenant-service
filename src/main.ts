import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TenantModule } from './tenant.module';

// main.ts
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TenantModule,
    {
      // transport: Transport.TCP,
      // options: {
      //   host: 'localhost',
      //   port: 3005,
      // },
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'tenant_queue',
      },
    }
  ); // HTTP App
  // app.setGlobalPrefix('api');

  // // Optional: Swagger Setup
  // const config = new DocumentBuilder()
  //   .setTitle('OrderLink Tenant Service API')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);

  // // Microservice TCP Setup
  // const microservice = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@localhost:5672'],
  //     queue: 'tenant_queue',
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen();
}
bootstrap();
