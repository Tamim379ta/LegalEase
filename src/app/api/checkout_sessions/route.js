import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const { lawyerName, hourlyRate, lawyerId, clientId, hiringId, clientEmail } = await request.json()

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: hourlyRate * 100,
            product_data: {
              name: `Consultation with ${lawyerName}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: clientEmail,  
      metadata: { lawyerId, clientId, hiringId },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/lawyers`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
  }
}