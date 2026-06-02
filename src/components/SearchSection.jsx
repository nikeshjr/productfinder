import { useRef } from 'react';
import { Barcode, Search, X } from 'lucide-react';

export default function SearchSection({
  barcode,
  onChangeBarcode,
  onSearch,
  loading,
}) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const clearInput = () => {
    onChangeBarcode('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Curated list of actual global food product barcodes for instant preview
  const samples = [
    { label: '🍫 Nutella (3017620425035)', value: '3017620425035' },
    { label: '🥤 Coca-Cola (5449000000996)', value: '5449000000996' },
    { label: '🍪 Unibic (8906009079073)', value: '8906009079073' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto" id="search-container">
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-6 md:p-8 transition-all hover:shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="barcode-input"
            className="block text-sm font-medium text-neutral-700 tracking-tight"
          >
            Enter EAN/UPC Barcode Number
          </label>

          <div className="relative flex items-center">
            {/* Left side Barcode icon */}
            <div className="absolute left-4 text-neutral-400 pointer-events-none">
              <Barcode className="h-5 w-5" />
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              id="barcode-input"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="e.g. 3017620425035"
              value={barcode}
              onChange={(e) => onChangeBarcode(e.target.value.replace(/\D/g, ''))}
              disabled={loading}
              className="w-full pl-12 pr-11 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl font-sans text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all disabled:opacity-60 text-lg tracking-wider font-medium"
              aria-label="Input barcode digits"
            />

            {/* Clear Input Button */}
            {barcode && !loading && (
              <button
                type="button"
                onClick={clearInput}
                className="absolute right-4 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all focus:outline-none focus:ring-1 focus:ring-neutral-300"
                aria-label="Clear field"
                id="clear-barcode-btn"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search CTA */}
          <button
            type="submit"
            disabled={loading}
            id="search-submit-btn"
            className="w-full flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 cursor-pointer active:scale-[0.99] group text-sm md:text-base"
          >
            <Search className="h-5 w-5 text-neutral-300 group-hover:text-white group-hover:scale-105 transition-transform" />
            {loading ? 'Searching Code...' : 'Search Product'}
          </button>
        </form>

        {/* Quick Sample Presets */}
        <div className="mt-6 border-t border-neutral-100 pt-5">
          <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Instant Test Candidates
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            {samples.map((sample) => (
              <button
                key={sample.value}
                type="button"
                id={`sample-btn-${sample.value}`}
                onClick={() => {
                  onChangeBarcode(sample.value);
                  onSearch(sample.value);
                }}
                disabled={loading}
                className="flex-1 text-left sm:text-center text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 py-2.5 px-3 rounded-lg border border-neutral-200/60 transition-all cursor-pointer font-medium whitespace-nowrap overflow-hidden text-ellipsis disabled:opacity-50"
              >
                {sample.label.split(' ')[0]} {sample.label.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
