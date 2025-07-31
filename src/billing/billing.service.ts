import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  ModuleName,
  UserTier,
  calculateOrderLinkPricing,
} from './billing.utils';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    });
  }

  async processWebhook(payload: Buffer, signature: string) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
    const event = this.stripe.webhooks.constructEvent(payload, signature, secret);
    await this.handleStripeEvent(event);
  }

  private async handleStripeEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Stripe checkout completed for session ${session.id}`);
        break;
      }
      default:
        console.log(`Unhandled stripe event ${event.type}`);
    }
  }

  async createCheckoutSession({
    modules,
    userTier,
    email,
  }: {
    modules: ModuleName[];
    userTier: UserTier;
    email: string;
  }) {
    const pricing = calculateOrderLinkPricing(modules, userTier); // aus vorheriger Logik

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: pricing.netMonthly * 100,
            product_data: {
              name: `OrderLink Abo (${modules.join(' + ')})`,
              description: `Tenant mit ${userTier} Nutzer`,
            },
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'eur',
            unit_amount: pricing.setupFee * 100,
            product_data: {
              name: 'Einrichtungsgebühr',
            },
          },
          quantity: 1,
        },
      ],
      success_url: 'https://yourapp.com/success',
      cancel_url: 'https://yourapp.com/cancel',
    });

    return { url: session.url };
  }
}
