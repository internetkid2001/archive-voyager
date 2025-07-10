# Archive Voyager

A modern, accessible web application for searching and exploring content from the Internet Archive. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Advanced Search**: Search across all Internet Archive collections with support for:
  - Text-based queries
  - Creator/author filtering
  - Media type filtering (audio, movies, texts, software, images)
  - Real-time search with debouncing (300ms delay)

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility First**: Full keyboard navigation, screen reader support, and ARIA labels
- **Performance Optimized**: 
  - Debounced search to prevent excessive API calls
  - Memoized React components to prevent unnecessary re-renders
  - Efficient state management with localStorage persistence

- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Modern UI**: Clean, dark theme with smooth animations and hover effects

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript with enhanced developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable icons
- **Internet Archive API** - Direct integration with archive.org search API

## 📁 Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.tsx    # Error boundary for graceful error handling
│   ├── Modal.tsx            # Modal component for viewing archive items
│   ├── ResultsGrid.tsx      # Grid layout for search results
│   └── SearchBar.tsx        # Search input with filters
├── services/
│   └── archive.ts           # Internet Archive API integration
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles and Tailwind imports
```

## 🔧 How It Works

### Search Process
1. **User Input**: Users enter search terms and optionally filter by creator and media type
2. **Debounced Search**: The app waits 300ms after the user stops typing before making API calls
3. **API Request**: Constructs and sends a request to the Internet Archive's advanced search API
4. **Results Display**: Shows up to 50 results in a responsive grid layout
5. **State Persistence**: Search terms and results are saved to localStorage for session persistence

### Architecture Details

#### App.tsx (Main Component)
- **State Management**: Uses React hooks to manage:
  - Search parameters (term, creator, media type)
  - Results array and loading states
  - Error handling and user feedback
  - Selected item for modal viewing

- **Performance Features**:
  - `useCallback` hooks to prevent unnecessary re-renders
  - Debounced search to reduce API calls
  - Safe localStorage operations with error handling

#### Services Layer (archive.ts)
- **API Integration**: Handles all communication with Internet Archive
- **Type Safety**: Defines TypeScript interfaces for API responses
- **Error Handling**: Comprehensive error catching and user-friendly messages
- **Query Construction**: Builds complex search queries with multiple parameters

#### Component Architecture
- **SearchBar**: Controlled components with real-time validation
- **ResultsGrid**: Displays results with accessibility features and empty states
- **Modal**: Full-screen overlay for viewing archive items with iframe integration
- **ErrorBoundary**: Catches and displays errors gracefully

## 🎨 User Experience Features

### Search Experience
- **Auto-complete**: Search suggestions as you type
- **Visual Feedback**: Loading states and progress indicators
- **Empty States**: Helpful messages when no results are found
- **Error Recovery**: Clear error messages with retry options

### Accessibility
- **Keyboard Navigation**: Full tab navigation support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators and logical tab order
- **High Contrast**: Designed for readability with sufficient color contrast

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Responsive layout that adapts to screen size
- **Touch-Friendly**: Appropriately sized touch targets

## 🔐 Security Features

- **Content Security**: Secure iframe sandboxing for external content
- **Input Validation**: Proper encoding and validation of user inputs
- **Error Boundaries**: Prevents application crashes from propagating
- **Safe DOM Operations**: XSS prevention through React's built-in protections

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd archive-voyager

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌐 API Integration

The app integrates with the Internet Archive's Advanced Search API:

```typescript
// Example API call
const searchArchive = async (query: string, mediaType: string, creator?: string) => {
  const url = `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier,title,creator,year,mediatype,description&rows=50&output=json`;
  // ... implementation
};
```

### API Features Used
- **Advanced Search**: Complex query construction with multiple filters
- **Metadata Retrieval**: Fetches title, creator, year, description, and media type
- **Pagination**: Supports paginated results (currently showing first 50)
- **JSON Response**: Structured data for easy parsing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Future Enhancements

- **Pagination**: Load more results with infinite scroll
- **Advanced Filters**: Date range, file size, and format filtering
- **Favorites**: Save and manage favorite items
- **Download Manager**: Bulk download capabilities
- **Offline Support**: PWA features for offline browsing
- **Social Features**: Share and bookmark items

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Internet Archive** - For providing free access to millions of books, movies, music, and more
- **React Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library