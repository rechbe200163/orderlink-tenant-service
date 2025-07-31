import { Body, Controller, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @ApiBody({
    description: 'Billing information for checkout session',
    type: CreateCheckoutSessionDto,
    required: true,
  })
  @Post('checkout')
  async startCheckout(@Body() body: CreateCheckoutSessionDto) {
    return this.billingService.createCheckoutSession(body);
  }
}
