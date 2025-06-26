import React, { useState } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  destination: string;
  arrivalDate: string;
  returnDate: string;
  numberOfPeople: number;
}

const SOLAR_SYSTEM_DESTINATIONS = [
  // Inner Planets
  { value: 'mercury', label: 'Mercury' },
  { value: 'venus', label: 'Venus' },
  { value: 'earth-moon', label: 'Earth\'s Moon' },
  { value: 'mars', label: 'Mars' },
  
  // Asteroid Belt
  { value: 'ceres', label: 'Ceres (Dwarf Planet)' },
  { value: 'vesta', label: 'Vesta (Asteroid)' },
  
  // Outer Planets and Moons
  { value: 'jupiter', label: 'Jupiter' },
  { value: 'io', label: 'Io (Jupiter\'s Moon)' },
  { value: 'europa', label: 'Europa (Jupiter\'s Moon)' },
  { value: 'ganymede', label: 'Ganymede (Jupiter\'s Moon)' },
  { value: 'callisto', label: 'Callisto (Jupiter\'s Moon)' },
  
  { value: 'saturn', label: 'Saturn' },
  { value: 'titan', label: 'Titan (Saturn\'s Moon)' },
  { value: 'enceladus', label: 'Enceladus (Saturn\'s Moon)' },
  { value: 'mimas', label: 'Mimas (Saturn\'s Moon)' },
  
  { value: 'uranus', label: 'Uranus' },
  { value: 'miranda', label: 'Miranda (Uranus\'s Moon)' },
  { value: 'ariel', label: 'Ariel (Uranus\'s Moon)' },
  
  { value: 'neptune', label: 'Neptune' },
  { value: 'triton', label: 'Triton (Neptune\'s Moon)' },
  
  // Dwarf Planets
  { value: 'pluto', label: 'Pluto & Charon' },
  { value: 'eris', label: 'Eris (Dwarf Planet)' },
  { value: 'makemake', label: 'Makemake (Dwarf Planet)' },
  { value: 'haumea', label: 'Haumea (Dwarf Planet)' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !arrivalDate || !returnDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (new Date(arrivalDate) >= new Date(returnDate)) {
      alert('Return date must be after arrival date');
      return;
    }

    onSearch({
      destination,
      arrivalDate,
      returnDate,
      numberOfPeople,
    });
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <h2>Plan Your Space Adventure</h2>
        
        <div className="form-group">
          <label htmlFor="destination">
            <span className="label-icon">🚀</span>
            Destination
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">Select your destination...</option>
            {SOLAR_SYSTEM_DESTINATIONS.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="arrivalDate">
              <span className="label-icon">📅</span>
              Arrival Date
            </label>
            <input
              type="date"
              id="arrivalDate"
              value={arrivalDate}
              min={minDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">
              <span className="label-icon">🔄</span>
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              min={arrivalDate || minDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">
            <span className="label-icon">👥</span>
            Number of Travelers
          </label>
          <div className="number-input-container">
            <button
              type="button"
              className="number-btn"
              onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
            >
              -
            </button>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              min="1"
              max="10"
              onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
              readOnly
            />
            <button
              type="button"
              className="number-btn"
              onClick={() => setNumberOfPeople(Math.min(10, numberOfPeople + 1))}
            >
              +
            </button>
          </div>
        </div>

        <button type="submit" className="search-btn">
          <span className="btn-icon">🔍</span>
          Search Space Voyages
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
