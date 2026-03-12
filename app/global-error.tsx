'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-red-500/20">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase">Critical System Fault</h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
            The Chennai Metro digital twin encountered a severe error. Our engineers have been notified.
          </p>
          <button
            onClick={() => reset()}
            className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded-full shadow-xl"
          >
            Reboot Interface
          </button>
        </div>
      </body>
    </html>
  )
}
