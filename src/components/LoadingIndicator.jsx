import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="loading-indicator"
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden"
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100 opacity-75">

        {/* Skeleton Image Area */}
        <div className="md:w-2/5 bg-neutral-50/50 flex flex-col items-center justify-center p-8 min-h-[220px] md:min-h-[280px] animate-pulse">
          <div className="h-28 w-28 bg-neutral-200/70 rounded-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-neutral-400 animate-spin" />
          </div>
          <div className="h-3 w-20 bg-neutral-200/50 rounded-full mt-4" />
        </div>

        {/* Skeleton content area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-5 animate-pulse">
          <div className="space-y-2">
            <div className="h-3 w-1/4 bg-neutral-200/50 rounded-full" />
            <div className="h-7 w-3/4 bg-neutral-300/60 rounded-lg" />
          </div>

          <hr className="border-neutral-100" />

          <div className="space-y-2.5">
            <div className="h-3 w-1/5 bg-neutral-200/50 rounded-full" />
            <div className="h-4 w-full bg-neutral-200/60 rounded-md" />
            <div className="h-4 w-5/6 bg-neutral-200/60 rounded-md" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
