import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Barcode, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';
import SearchSection from './components/SearchSection.jsx';
import ProductResult from './components/ProductResult.jsx';
import ErrorAlert from './components/ErrorAlert.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';

export default function App() {
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);

  // Core lookup logic integrating dynamic URL substitution and strict property mapping
  const handleSearch = async (customBarcode) => {
    const codeToSearch = customBarcode !== undefined ? customBarcode : barcode;
    const sanitizedCode = codeToSearch.trim();

    // 1. Empty Input validation
    if (!sanitizedCode) {
      setError('empty');
      setProductData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setProductData(null);

    try {
      // 2. Dynamic Barcode Replacement
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(sanitizedCode)}.json`
      );

      if (response.status === 404) {
        setError('not_found');
        return;
      }

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const json = await response.json();

      // 3. Inspect Open Food Facts status code
      if (json && json.status === 1 && json.product) {
        const item = json.product;

        // Map product name: check product_name_en first, fallback to product_name
        const mappedName = item.product_name_en?.trim()
          ? item.product_name_en
          : item.product_name;

        // Map description: check generic_name_en first, fallback to generic_name, then to categories
        const mappedDescription = item.generic_name_en?.trim()
          ? item.generic_name_en
          : (item.generic_name?.trim() ? item.generic_name : item.categories);

        setProductData({
          item_name: mappedName || '',
          description: mappedDescription || '',
          image: item.image_front_url || '',
        });
      } else {
        // Status code 0 (or null product) represents item not found
        setError('not_found');
      }
    } catch (err) {
      console.error('Barcode Search Request Failed:', err);
      setError('network');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-neutral-950 selection:text-white">

      {/* Absolute Decorative Top Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-80 bg-linear-to-b from-neutral-100/70 to-transparent pointer-events-none" />

      {/* Main Container with smooth height layout animation */}
      <motion.div
        layout
        className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-16 flex flex-col justify-start space-y-8 md:space-y-10"
        id="app-main-layout"
      >

        {/* Application Header */}
        <header className="text-center space-y-2" id="app-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/80 rounded-full shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase font-mono">
              Live Database Active
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="p-2.5 bg-neutral-950 text-white rounded-xl shadow-xs">
              <Barcode className="h-6 w-6 stroke-[1.75]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 tracking-tight">
              Barcode Product Finder
            </h1>
          </div>

          <p className="text-neutral-500 text-sm md:text-base max-w-lg mx-auto font-medium">
            Search barcodes against the Open Food Facts repository to fetch details, high-res photos, and categorize listings.
          </p>
        </header>

        {/* Form and Quick Samples */}
        <SearchSection
          barcode={barcode}
          onChangeBarcode={setBarcode}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Transition area for Results / Skeleton Loader / Error Alert Cards */}
        <main className="w-full space-y-4" id="app-results-area">
          <AnimatePresence mode="wait">

            {/* Loading Skeleton block */}
            {loading && (
              <LoadingIndicator key="loading-state" />
            )}

            {/* Error alerts block */}
            {error && !loading && (
              <ErrorAlert key="error-state" errorType={error} />
            )}

            {/* Visual Product card */}
            {productData && !loading && !error && (
              <ProductResult
                key="result-state"
                product={productData}
                barcode={barcode}
                onClose={() => setProductData(null)}
              />
            )}

          </AnimatePresence>
        </main>

        {/* Informative layout card */}
        {!productData && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto p-5 border border-dashed border-neutral-205 rounded-xl bg-neutral-100/40 text-center"
            id="idle-instructions"
          >
            <div className="flex justify-center mb-2.5 text-neutral-400">
              <HelpCircle className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h3 className="text-neutral-800 text-xs font-bold uppercase tracking-wider mb-1">
              Need a test code?
            </h3>
            <p className="text-xs text-neutral-450 leading-relaxed max-w-sm mx-auto">
              Choose one of the fast test options above or input any UPC-A/EAN-13 food carton barcode from your local packaging to see real-time updates.
            </p>
          </motion.div>
        )}

      </motion.div>

      {/* Modern Footer with high semantic contrast */}
      <footer className="mt-auto py-6 border-t border-neutral-150 bg-white/50 backdrop-blur-xs text-center text-xs text-neutral-400 font-medium">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 hover:text-neutral-600 transition-colors">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>Open Source Database Lookup</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-neutral-600 inline-flex items-center gap-1 hover:underline transition-all"
            >
              Open Food Facts <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
