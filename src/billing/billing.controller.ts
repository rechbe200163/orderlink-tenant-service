import { Body, Controller, Post, RawBody, Req } from '@nestjs/common';
import { Request } from 'express';
import { BillingService } from './billing.service';
import { ApiBody } from '@nestjs/swagger';
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

  @Post('webhooks/stripe')
  @RawBody()
  async handleStripeWebhook(@Req() req: Request, @RawBody() rawBody: Buffer) {
    const signature = req.headers['stripe-signature'] as string;
    await this.billingService.processWebhook(rawBody, signature);
    return { received: true };
  }
}
