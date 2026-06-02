import { motion } from 'motion/react';
import { AlertCircle, EyeOff, WifiOff, FileQuestion } from 'lucide-react';

export default function ErrorAlert({ errorType }) {
  if (!errorType) return null;

  // Exact configuration matching and expanding on the User visual/functional spec
  const config = {
    empty: {
      title: 'Value Required',
      message: 'Please enter a barcode.',
      icon: AlertCircle,
    },
    not_found: {
      title: 'Item Not Found',
      message: 'No product found for this barcode.',
      icon: EyeOff,
    },
    network: {
      title: 'Network Connection Lost',
      message: 'Unable to fetch product information. Please try again later.',
      icon: WifiOff,
    },
  }[errorType] || {
    title: 'Lookup Error',
    message: 'An unexpected lookup error occurred. Please try again.',
    icon: FileQuestion,
  };

  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      id={`error-alert-${errorType}`}
      className="w-full max-w-xl mx-auto bg-red-50 border border-red-200 rounded-xl p-4 md:p-5 flex items-start gap-3.5 shadow-sm"
    >
      <div className="p-2 bg-red-100 rounded-lg text-red-600 shrink-0">
        <IconComponent className="h-5 w-5 stroke-[2]" />
      </div>

      <div className="flex-1 space-y-0.5">
        <h3 className="font-display font-bold text-red-950 text-sm tracking-tight">
          {config.title}
        </h3>
        <p className="text-red-800 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
          {config.message}
        </p>
      </div>
    </motion.div>
  );
}
