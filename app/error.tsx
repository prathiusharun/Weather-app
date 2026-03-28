"use client"
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <p className="text-white/60 mb-8 text-lg">Maybe the city name was wrong or the internet is down.</p>
      <button 
        onClick={() => reset()}
        className="bg-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-500 transition-all"
      >
        Try Again
      </button>
    </div>
  )
}