export interface ArchiveItem {
    identifier: string;
    title: string;
    creator: string | string[];
    year: string;
    mediatype: string;
    description: string | string[];
}



const ARCHIVE_BASE_URL = 'https://archive.org/advancedsearch.php';
const MAX_RESULTS = 50;
const SEARCH_FIELDS = 'identifier,title,creator,year,mediatype,description';

export const searchArchive = async (query: string, mediaType: string, creator?: string): Promise<ArchiveItem[]> => {
    const queryParts = [];
    
    if (query.trim()) {
        queryParts.push(encodeURIComponent(query.trim()));
    }
    
    if (mediaType !== 'all') {
        queryParts.push(`mediatype:(${mediaType})`);
    }
    
    if (creator?.trim()) {
        queryParts.push(`creator:(${encodeURIComponent(creator.trim())})`);
    }
    
    if (queryParts.length === 0) {
        throw new Error('At least one search parameter is required');
    }
    
    const searchQuery = queryParts.join(' AND ');
    const url = `${ARCHIVE_BASE_URL}?q=${searchQuery}&fl[]=${SEARCH_FIELDS}&rows=${MAX_RESULTS}&page=1&output=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.response?.docs || [];
};

