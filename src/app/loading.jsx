
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        {/* Animated Scale */}
        <div className="flex justify-center mb-8">
          <span className="text-[100px] leading-none select-none animate-pulse">⚖️</span>
        </div>

        {/* Spinner dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[#814f30] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Stamp */}
        <div className="inline-block px-4 py-1 border-2 border-dashed border-[#814f30] rounded text-[#814f30] text-xs font-bold uppercase tracking-widest mb-5">
          Case Loading
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          Retrieving your legal files, please hold...
        </p>

      </div>
    </main>
  );
}