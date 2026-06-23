import { stripe } from '../../lib/stripe'
import { redirect } from 'next/navigation'

export default async function SuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams  // 👈 await this

  if (!sessionId) redirect('/')

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status === 'paid') {
    const { lawyerId, clientId, hiringId } = session.metadata

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lawyerId,
        clientId,
        hiringId,
        amount: session.amount_total / 100,
        currency: session.currency,
        stripeSessionId: session.id,
        status: 'paid',
      }),
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Your consultation has been booked.</p>
    </div>
  )
}