import React from 'react';
import DestinationCard from './DestinationCard';
import SearchForm, { SearchData } from '../SearchForm';
import destinationsData from '../destinations.json';
import { Destination } from '../types';

interface DestinationsListProps {
  onSearch?: (searchData: SearchData) => void;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ onSearch }) => {
  const handleSearch = (searchData: SearchData) => {
    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <div className="destinations-container">
      <h1>Space Vacation Destinations</h1>
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
