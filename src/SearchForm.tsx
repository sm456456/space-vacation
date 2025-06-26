import React, { useState, useRef, useEffect } from 'react';
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

interface DestinationOption {
  value: string;
  label: string;
  image: string;
  category: string;
}

const SOLAR_SYSTEM_DESTINATIONS: DestinationOption[] = [
  // Featured Destinations (matching your destinations.json)
  { 
    value: 'mars', 
    label: 'Mars - The Red Planet', 
    image: 'https://images.unsplash.com/photo-1572182574781-792d6a676b4a?w=400&h=300&fit=crop',
    category: 'Featured'
  },
  { 
    value: 'moon', 
    label: 'Earth\'s Moon', 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    category: 'Featured'
  },
  { 
    value: 'iss', 
    label: 'International Space Station', 
    image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=400&h=300&fit=crop',
    category: 'Featured'
  },
  { 
    value: 'venus', 
    label: 'Venus - Cloud Cities', 
    image: 'https://images.unsplash.com/photo-1621540955018-68b143152b7c?w=400&h=300&fit=crop',
    category: 'Featured'
  },
  
  // Inner Solar System
  { 
    value: 'mercury', 
    label: 'Mercury - Closest to Sun', 
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop',
    category: 'Inner Solar System'
  },
  
  // Asteroid Belt
  { 
    value: 'ceres', 
    label: 'Ceres - Dwarf Planet', 
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    category: 'Asteroid Belt'
  },
  { 
    value: 'vesta', 
    label: 'Vesta - Bright Asteroid', 
    image: 'https://images.unsplash.com/photo-1446776840624-35019f136584?w=400&h=300&fit=crop',
    category: 'Asteroid Belt'
  },
  
  // Jupiter System
  { 
    value: 'jupiter', 
    label: 'Jupiter - Gas Giant', 
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=300&fit=crop',
    category: 'Jupiter System'
  },
  { 
    value: 'io', 
    label: 'Io - Volcanic Moon', 
    image: 'https://images.unsplash.com/photo-1617722338533-dba0e5ed0c8f?w=400&h=300&fit=crop',
    category: 'Jupiter System'
  },
  { 
    value: 'europa', 
    label: 'Europa - Ocean Moon', 
    image: 'https://images.unsplash.com/photo-1568018473039-a42d51b7b5d1?w=400&h=300&fit=crop',
    category: 'Jupiter System'
  },
  { 
    value: 'ganymede', 
    label: 'Ganymede - Largest Moon', 
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
    category: 'Jupiter System'
  },
  { 
    value: 'callisto', 
    label: 'Callisto - Cratered Moon', 
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?w=400&h=300&fit=crop',
    category: 'Jupiter System'
  },
  
  // Saturn System
  { 
    value: 'saturn', 
    label: 'Saturn - Ringed Beauty', 
    image: 'https://images.unsplash.com/photo-1614732414444-096ad5c30fb0?w=400&h=300&fit=crop',
    category: 'Saturn System'
  },
  { 
    value: 'titan', 
    label: 'Titan - Methane Lakes', 
    image: 'https://images.unsplash.com/photo-1543536448-d209d2d13a1c?w=400&h=300&fit=crop',
    category: 'Saturn System'
  },
  { 
    value: 'enceladus', 
    label: 'Enceladus - Ice Geysers', 
    image: 'https://images.unsplash.com/photo-1572182574781-792d6a676b4a?w=400&h=300&fit=crop',
    category: 'Saturn System'
  },
  
  // Outer Solar System
  { 
    value: 'uranus', 
    label: 'Uranus - Tilted Ice Giant', 
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&h=300&fit=crop',
    category: 'Outer Solar System'
  },
  { 
    value: 'neptune', 
    label: 'Neptune - Windy Blue', 
    image: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=400&h=300&fit=crop',
    category: 'Outer Solar System'
  },
  { 
    value: 'triton', 
    label: 'Triton - Retrograde Moon', 
    image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?w=400&h=300&fit=crop',
    category: 'Outer Solar System'
  },
  
  // Dwarf Planets
  { 
    value: 'pluto', 
    label: 'Pluto & Charon', 
    image: 'https://images.unsplash.com/photo-1446776587462-d2ba27c4c909?w=400&h=300&fit=crop',
    category: 'Dwarf Planets'
  },
  { 
    value: 'eris', 
    label: 'Eris - Distant World', 
    image: 'https://images.unsplash.com/photo-1446776758069-f04b2770a99c?w=400&h=300&fit=crop',
    category: 'Dwarf Planets'
  },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [showDestinations, setShowDestinations] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedDestination = SOLAR_SYSTEM_DESTINATIONS.find(dest => dest.value === destination);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDestinations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Play spaceship takeoff sound effect
    if ((window as any).spaceSounds?.playSpaceshipTakeoff) {
      (window as any).spaceSounds.playSpaceshipTakeoff();
    }
    
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

  const handleDestinationSelect = (dest: DestinationOption) => {
    setDestination(dest.value);
    setShowDestinations(false);
  };

  // Group destinations by category
  const groupedDestinations = SOLAR_SYSTEM_DESTINATIONS.reduce((acc, dest) => {
    if (!acc[dest.category]) {
      acc[dest.category] = [];
    }
    acc[dest.category].push(dest);
    return acc;
  }, {} as Record<string, DestinationOption[]>);

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
          
          {selectedDestination && (
            <div className="selected-destination-preview">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.label}
                className="destination-preview-image"
              />
              <span className="destination-preview-name">{selectedDestination.label}</span>
            </div>
          )}
          
          <div className="destination-selector" ref={dropdownRef}>
            <button
              type="button"
              className="destination-toggle"
              onClick={() => setShowDestinations(!showDestinations)}
            >
              {destination ? selectedDestination?.label : 'Select your destination...'}
              <span className={`dropdown-arrow ${showDestinations ? 'open' : ''}`}>▼</span>
            </button>
            
            {showDestinations && (
              <div className="destinations-dropdown">
                {Object.entries(groupedDestinations).map(([category, destinations]) => (
                  <div key={category} className="destination-category">
                    <h4 className="category-title">{category}</h4>
                    <div className="destinations-grid">
                      {destinations.map((dest) => (
                        <div
                          key={dest.value}
                          className="destination-option"
                          onClick={() => handleDestinationSelect(dest)}
                        >
                          <img 
                            src={dest.image} 
                            alt={dest.label}
                            className="destination-option-image"
                          />
                          <span className="destination-option-name">{dest.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

        <button 
          type="submit" 
          className="search-btn"
          onMouseDown={() => {
            // Add button click feedback sound
            if ((window as any).spaceSounds?.playButtonClick) {
              (window as any).spaceSounds.playButtonClick();
            }
          }}
        >
          <span className="btn-icon">🔍</span>
          Search Space Voyages
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
