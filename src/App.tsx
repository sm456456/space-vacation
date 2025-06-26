import React from 'react';
import './App.css';
import DestinationsList from './components/DestinationsList';
import './components/DestinationsList.css';
import { SearchData } from './SearchForm';

function App() {
  const handleSearch = (searchData: SearchData) => {
    console.log('Search data:', searchData);
    // TODO: Implement search functionality
    alert(`Searching for trips to ${searchData.destination} for ${searchData.numberOfPeople} people from ${searchData.arrivalDate} to ${searchData.returnDate}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Vacation</h1>
        <p>Your ultimate space travel experience awaits!</p>
        <DestinationsList onSearch={handleSearch} />
      </header>
    </div>
  );
}

export default App;
