import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }
}
