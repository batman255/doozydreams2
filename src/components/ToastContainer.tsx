import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useStore();

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-[#141414]/95 backdrop-blur-md border border-[#C5A059]/40 p-4 rounded-lg shadow-2xl shadow-black/80 flex items-start gap-3 relative overflow-hidden"
          >
            {/* Shimmer top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            <div className="mt-0.5 shrink-0 text-[#C5A059]">
              {n.type === 'gold' ? (
                <Sparkles className="w-5 h-5 animate-pulse text-[#C5A059]" />
              ) : n.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Info className="w-5 h-5 text-neutral-300" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] font-sans">
                {n.title}
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed font-light">
                {n.message}
              </p>
            </div>

            <button
              onClick={() => removeNotification(n.id)}
              className="text-neutral-500 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};
