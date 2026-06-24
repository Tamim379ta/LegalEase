import { stripe } from '../../lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams

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

  const amount = (session.amount_total / 100).toFixed(2)
  const currency = session.currency.toUpperCase()

  return (
    <main className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

       

        {/* Heading */}
        <h1 className="text-6xl font-black text-[#1A2E44] tracking-tight mb-2">
          All Done!
        </h1>

        {/* Stamp */}
        <div className="inline-block px-4 py-1 border-2 border-dashed border-green-500 rounded text-green-600 text-xs font-bold uppercase tracking-widest mb-6">
          Payment Confirmed
        </div>

        <p className="text-slate-500 text-base leading-relaxed mb-6">
          Your consultation has been booked successfully. Your lawyer will
          reach out to you shortly to confirm the session details.
        </p>

        {/* Payment summary card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-8 text-left shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Payment Summary
          </p>
          <div className="flex justify-between items-center py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Status</span>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Paid
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-50">
            <span className="text-sm text-slate-500">Amount</span>
            <span className="text-sm font-semibold text-slate-800">
              {currency} {amount}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-500">Reference</span>
            <span className="text-xs font-mono text-slate-400 truncate max-w-[180px]">
              {session.id}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/client"
            className="px-6 py-3 rounded-xl bg-[#1A2E44] text-white text-sm font-semibold hover:bg-[#1A2E44]/90 transition-all"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/lawyers"
            className="px-6 py-3 rounded-xl border border-[#814f30]/40 text-[#814f30] text-sm font-semibold hover:bg-[#814f30]/10 transition-all"
          >
            Browse Lawyers
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-slate-400">
          LegalEase &mdash; A confirmation has been recorded.{" "}
          <Link href="/contact" className="underline hover:text-[#814f30]">
            Need help?
          </Link>
        </p>

      </div>
    </main>
  )
}