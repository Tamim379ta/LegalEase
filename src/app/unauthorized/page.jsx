import Link from 'next/link';
import {Lock} from '@gravity-ui/icons';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        {/* Icon Container */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-6">
          <Lock className="h-8 w-8" aria-hidden="true" />
        </div>

        {/* Text Content */}
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Error 403
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Access Denied
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          You don't have the required permissions to view this resource. Please log in with an authorized account.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/signIn"
            className="rounded-lg bg-[#1A2E44] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1A2E44]/90  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2E44] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}