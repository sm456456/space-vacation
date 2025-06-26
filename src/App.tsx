import React from 'react';
import './App.css';
import DestinationsList from './components/DestinationsList';
import './components/DestinationsList.css';
import { SearchData } from './SearchForm';

function App() {
  const handleSearch = (searchData: SearchData) => {
    console.log('Search conducted:', searchData);
    // The DestinationsList component now handles showing search results
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
