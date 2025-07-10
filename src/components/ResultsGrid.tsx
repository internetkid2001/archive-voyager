// src/components/ResultsGrid.tsx
import { ArchiveItem } from '../services/archive'; // Import the type definition

// Defines the props for a single result card
interface ResultCardProps {
    item: ArchiveItem;
    onItemClick: (item: ArchiveItem) => void;
}

function ResultCard({ item, onItemClick }: ResultCardProps) {
  const descriptionText = Array.isArray(item.description)
    ? item.description.join(' ')
    : item.description || '';

  return (
    <div 
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500" 
      onClick={() => onItemClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onItemClick(item);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${item.title || 'Untitled'} details`}
    >
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-cyan-300 mb-2">{item.title || 'Untitled'}</h2>
        <p className="text-sm text-gray-400 mb-1"><strong>Creator:</strong> {Array.isArray(item.creator) ? item.creator.join(', ') : item.creator || 'N/A'}</p>
        <p className="text-sm text-gray-400 mb-1"><strong>Year:</strong> {item.year || 'N/A'}</p>
        <p className="text-sm text-gray-400 mb-4"><strong>Type:</strong> <span className="font-semibold capitalize">{item.mediatype}</span></p>
        <p className="text-gray-500 text-xs flex-grow mb-4">{descriptionText ? `${descriptionText.substring(0, 120)}...` : 'No description available.'}</p>
      </div>
    </div>
  );
}

// Defines the props for the entire results grid
interface ResultsGridProps {
    results: ArchiveItem[];
    onItemClick: (item: ArchiveItem) => void;
}

export default function ResultsGrid({ results, onItemClick }: ResultsGridProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">No results found</h3>
        <p className="text-gray-500">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label="Search results">
      {results.map((item) => (
        <ResultCard key={item.identifier} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  );
}
