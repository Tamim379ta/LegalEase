import { topLawyers } from '@/lib/api/lawyers'
import Image from 'next/image'
import FadeUp from '../shared/FadeInOnScroll'

const TopLegalExperts = async () => {
  const lawyers = await topLawyers()

  const medals = ['🥇', '🥈', '🥉']

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      {/* Header */}
      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#814f30] bg-[#814f30]/10 border border-[#814f30]/20">
          Most Hired
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Top Legal Experts
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          Ranked by client hires. These lawyers have the most proven track record on LegalEase.
        </p>
      </FadeUp>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {lawyers.map((lawyer, index) => (
          <FadeUp key={index} delay={index * 0.15}>
            <div className="relative flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              {/* Medal */}
              <span className="absolute -top-4 text-3xl">{medals[index]}</span>

              {/* Avatar */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#f8f5f2] mb-4 mt-2">
                {lawyer.avatar ? (
                  <Image
                    src={lawyer.avatar}
                    alt={lawyer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A2E44] flex items-center justify-center text-white text-2xl font-bold">
                    {lawyer.name?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-bold text-slate-800 text-base">{lawyer.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{lawyer.specialization}</p>

              {/* Divider */}
              <div className="w-full border-t border-slate-50 my-4" />

              {/* Stats */}
              <div className="flex justify-center gap-6 w-full">
                <div>
                  <p className="text-lg font-extrabold text-[#1A2E44]">{lawyer.totalHires}</p>
                  <p className="text-xs text-slate-400">Total Hires</p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

    </section>
  )
}

export default TopLegalExperts