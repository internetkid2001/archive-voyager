// src/components/Modal.tsx
import React from 'react';
import { ArchiveItem } from '../services/archive';
import { X } from 'lucide-react';

interface ModalProps {
  item: ArchiveItem;
  onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 id="modal-title" className="text-lg font-bold text-cyan-400">Archive Viewer</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(`https://archive.org/details/${item.identifier}`, '_blank')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-300"
            >
              Open in New Tab
            </button>
            <a
              href={`https://archive.org/compress/${item.identifier}/formats=H.264&file=/${item.identifier}.zip`}
              download
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-300"
            >
              Download ZIP
            </a>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <iframe
            src={`https://archive.org/details/${item.identifier}`}
            className="w-full h-full border-0"
            title={`Archive content for ${item.title || 'Unknown item'}`}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}