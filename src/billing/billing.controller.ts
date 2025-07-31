import { Body, Controller, Post, RawBody, Req } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import Stripe from 'stripe';

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
  @RawBody() // wichtig: kein JSON-Parsing für Webhook!
  handleStripeWebhook(@Req() req: Request) {
    const event = this.stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        // Subscription erfolgreich → Tenant aktivieren
        break;
    }
  }
}
