import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-6xl font-black text-white mb-4 uppercase tracking-tighter">404</h2>
      <p className="text-xl text-white/50 mb-8 uppercase tracking-widest font-bold">Station Not Found</p>
      <Link
        href="/"
        className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all rounded-full"
      >
        Return to Central Hub
      </Link>
    </div>
  )
}
