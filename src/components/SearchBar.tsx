// src/components/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';

// Defines the props expected by the SearchBar component
interface SearchBarProps {
  onSearch: () => void;
  onDebouncedSearch: () => void;
  loading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  mediaType: string;
  setMediaType: React.Dispatch<React.SetStateAction<string>>;
  creatorTerm: string;
  setCreatorTerm: React.Dispatch<React.SetStateAction<string>>;
}

const mediaTypes = [
    { value: 'all', label: 'All Media' },
    { value: 'audio', label: 'Audio' },
    { value: 'movies', label: 'Movies & Videos' },
    { value: 'texts', label: 'Texts' },
    { value: 'software', label: 'Software' },
    { value: 'image', label: 'Images' },
];

export default function SearchBar({ onSearch, onDebouncedSearch, loading, searchTerm, setSearchTerm, mediaType, setMediaType, creatorTerm, setCreatorTerm }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 mb-8">
      <div className="relative flex-grow w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onDebouncedSearch();
          }}
          placeholder="Search for anything..."
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Search for content"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="relative flex-grow w-full">
        <input
          type="text"
          value={creatorTerm}
          onChange={(e) => {
            setCreatorTerm(e.target.value);
            onDebouncedSearch();
          }}
          placeholder="Filter by creator..."
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Filter by creator"
        />
      </div>
      <select
        value={mediaType}
        onChange={(e) => {
          setMediaType(e.target.value);
          onDebouncedSearch();
        }}
        className="bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full md:w-auto"
        aria-label="Select media type"
      >
        {mediaTypes.map(type => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}