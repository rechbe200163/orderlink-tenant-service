import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [TenantModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
