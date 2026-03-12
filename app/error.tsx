'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Something went wrong!</h2>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        The metro service encountered an unexpected technical issue. Please try restarting your journey.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
      >
        Try again
      </button>
    </div>
  )
}
