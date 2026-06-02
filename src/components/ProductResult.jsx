import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Package, X } from 'lucide-react';

export default function ProductResult({ product, barcode, onClose }) {
  // Listen for Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Premium Backdrop Animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  // Premium Modal Entry/Pop-in Animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.94,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.55,
        bounce: 0.18,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        variants={cardVariants}
        id="product-result-card"
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden transition-all duration-300 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Close Button with hover effects and micro-interaction */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 bg-neutral-100/80 hover:bg-neutral-200/90 text-neutral-500 hover:text-neutral-800 rounded-full transition-all duration-200 cursor-pointer shadow-xs focus:outline-hidden hover:scale-105 active:scale-95"
          aria-label="Close details"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>

        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100">

          {/* Animated Item 1: Product Image */}
          <motion.div
            variants={itemVariants}
            className="md:w-2/5 bg-neutral-50 flex items-center justify-center p-6 relative group overflow-hidden min-h-[240px] md:min-h-[300px]"
            id="result-image-container"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.item_name || 'Product Image'}
                referrerPolicy="no-referrer"
                className="max-h-64 md:max-h-72 w-auto object-contain rounded-xl shadow-xs group-hover:scale-[1.03] transition-transform duration-500 select-none"
                loading="lazy"
              />
            ) : (
              /* Premium Fallback Design instead of a dry file icon */
              <div className="flex flex-col items-center justify-center text-neutral-400 text-center p-6 select-none">
                <div className="p-4 bg-neutral-100 rounded-2xl mb-3 text-neutral-500">
                  <Package className="h-8 w-8 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  No Preview Image
                </span>
                <p className="text-[11px] text-neutral-400 mt-1 max-w-[150px]">
                  Not uploaded to Open Food Facts database yet
                </p>
              </div>
            )}
          </motion.div>

          {/* Textual Details Segment */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-5">
            <div>
              {/* Tag line and EAN barcode */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 select-none pr-8">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                  <span>Verified Product Record</span>
                </div>
                <div className="bg-neutral-100 text-neutral-700 text-[10px] tracking-widest font-mono font-semibold px-2.5 py-1 rounded-full border border-neutral-200/60 shadow-2xs">
                  EAN: {barcode}
                </div>
              </div>

              {/* Animated Item 2: Product Name */}
              <motion.h2
                variants={itemVariants}
                id="product-item-name"
                className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 tracking-tight leading-8 break-words"
              >
                {product.item_name || 'Unnamed Product'}
              </motion.h2>
            </div>

            <hr className="border-neutral-100" />

            {/* Animated Item 3: Product Description */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Generic Name & Categories
              </span>
              <p
                id="product-item-description"
                className="text-neutral-600 text-sm md:text-base leading-relaxed break-words whitespace-pre-line pr-1"
              >
                {product.description || 'No descriptive tags or generic categories listed in the database for this product barcode.'}
              </p>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
