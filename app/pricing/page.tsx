import React from 'react'
import { Sparkles } from 'lucide-react'

function page() {
  return (
    <div className="text-4xl justify-center items-center flex h-screen bg-white dark:bg-black text-zinc-900 dark:text-white p-4">
      <div className="max-w-xl text-center space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-md shadow-lg dark:shadow-2xl">

        {/* Animated Free Access Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mx-auto tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Early Access Offer
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          100% Free For Now.
        </h1>

        {/* Subtext description */}
        <p className="text-base font-normal text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
          We're constantly fine-tuning features. While we build out the infrastructure, enjoy full Pro access on us—no strings attached.
        </p>

        {/* Mini CTA text link to get them moving */}
        <div className="pt-2">
          <a
            href="/dashboard"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1 hover:underline"
          >
            Start creating now &rarr;
          </a>
        </div>

      </div>
    </div>
  )
}

export default page