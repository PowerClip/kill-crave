#!/usr/bin/env node
import Stripe from 'stripe';

const { STRIPE_SECRET_KEY } = process.env;
if (!STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

async function main() {
  try {
    // Create a Product and Price if you don't already have one.
    // In production, you likely pre-create and reuse these IDs.
    const product = await stripe.products.create({
      name: 'Bye Sweetie – Spray 30 Jours',
      description: 'Neutralise le goût sucré 30–60 min. 90 doses.',
    });

    const price = await stripe.prices.create({
      unit_amount: 2490, // 24.90 EUR
      currency: 'eur',
      product: product.id,
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Livraison Standard (3-5 jours)',
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 }
            }
          }
        }
      ],
      // Optional: collect phone for delivery updates
      phone_number_collection: { enabled: true },
      // Optional: after completion URL
      after_completion: { type: 'redirect', redirect: { url: 'https://resettaste.fr/merci' } }
    });

    console.log('Payment Link created:');
    console.log(paymentLink.url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
