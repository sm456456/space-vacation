import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import SearchForm, { SearchData } from '../SearchForm';
import SearchResults from './SearchResults';
import destinationsData from '../destinations.json';
import { Destination } from '../types';

interface DestinationsListProps {
  onSearch?: (searchData: SearchData) => void;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ onSearch }) => {
  const [searchResults, setSearchResults] = useState<SearchData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchData: SearchData) => {
    setSearchResults(searchData);
    setShowResults(true);
    
    if (onSearch) {
      onSearch(searchData);
    }
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setShowResults(false);
  };

  if (showResults && searchResults) {
    return (
      <SearchResults 
        searchData={searchResults} 
        onClearSearch={handleClearSearch}
      />
    );
  }

  return (
    <div className="destinations-container">
      <SearchForm onSearch={handleSearch} />
      <div className="destinations-grid">
        {destinationsData.destinations.map((destination: Destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationsList;
