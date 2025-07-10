// src/App.tsx
import React from 'react';
import SearchBar from './src/components/SearchBar';
import ResultsGrid from './src/components/ResultsGrid';
import Modal from './src/components/Modal';
import ErrorBoundary from './src/components/ErrorBoundary';
import { searchArchive, ArchiveItem } from './src/services/archive';

const safeParseJSON = (json: string | null, fallback: any = null) => {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to save to localStorage: ${error}`);
  }
};

export default function App() {
  // State management with explicit types
  const [searchTerm, setSearchTerm] = React.useState<string>(() => localStorage.getItem('searchTerm') || '');
  const [creatorTerm, setCreatorTerm] = React.useState<string>(() => localStorage.getItem('creatorTerm') || '');
  const [mediaType, setMediaType] = React.useState<string>(() => localStorage.getItem('mediaType') || 'all');
  const [results, setResults] = React.useState<ArchiveItem[]>(() => {
    const storedResults = localStorage.getItem('searchResults');
    return safeParseJSON(storedResults, []);
  });

  React.useEffect(() => {
    safeSetLocalStorage('searchTerm', searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    safeSetLocalStorage('creatorTerm', creatorTerm);
  }, [creatorTerm]);

  React.useEffect(() => {
    safeSetLocalStorage('mediaType', mediaType);
  }, [mediaType]);

  React.useEffect(() => {
    safeSetLocalStorage('searchResults', JSON.stringify(results));
  }, [results]);

  // Trigger search on initial load if there's a search term
  React.useEffect(() => {
    if (searchTerm.trim() || creatorTerm.trim()) {
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<ArchiveItem | null>(null);
  
  const debouncedSearch = React.useRef<number | null>(null);

  const handleSearch = React.useCallback(async () => {
    if (!searchTerm.trim() && !creatorTerm.trim()) {
      setError('Please enter a search term or creator name.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const searchResults = await searchArchive(searchTerm, mediaType, creatorTerm);
      if (searchResults.length === 0) {
        setError('No results found for your query.');
      }
      setResults(searchResults);
    } catch (err: any) {
      setError(`Failed to fetch results: ${err.message}`);
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, mediaType, creatorTerm]);

  const handleItemClick = React.useCallback((item: ArchiveItem) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleDebouncedSearch = React.useCallback(() => {
    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }
    debouncedSearch.current = setTimeout(() => {
      handleSearch();
    }, 300);
  }, [handleSearch]);

  return (
    <ErrorBoundary>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <div className="container mx-auto p-4 md:p-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">Archive Voyager</h1>
            <p className="text-gray-400 mt-2">Search for movies, music, books, and more.</p>
          </header>

          <main>
            <SearchBar
              onSearch={handleSearch}
              onDebouncedSearch={handleDebouncedSearch}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              mediaType={mediaType}
              setMediaType={setMediaType}
              creatorTerm={creatorTerm}
              setCreatorTerm={setCreatorTerm}
            />

            {error && (
              <div 
                className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center mb-8"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-64" role="status" aria-label="Loading search results">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!loading && (
              <ResultsGrid results={results} onItemClick={handleItemClick} />
            )}
          </main>

          {selectedItem && (
            <Modal
              item={selectedItem}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}