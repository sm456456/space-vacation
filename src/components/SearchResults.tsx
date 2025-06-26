import React, { useState } from 'react';
import { Destination } from '../types';
import { SearchData } from '../SearchForm';
import destinationsData from '../destinations.json';
import './SearchResults.css';

interface RoomType {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  features: string[];
  maxOccupancy: number;
}

const ROOM_TYPES: RoomType[] = [
  {
    id: 'affordable',
    name: 'Cosmic Pod',
    description: 'Cozy and efficient space accommodation perfect for budget-conscious space travelers. Features panoramic viewport and essential amenities.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    price: 299,
    features: [
      'Panoramic space viewport',
      'Climate-controlled environment',
      'Personal storage compartment',
      'Emergency communication system',
      'Basic nutrition station'
    ],
    maxOccupancy: 2
  },
  {
    id: 'regular',
    name: 'Stellar Suite',
    description: 'Comfortable mid-tier accommodation with enhanced amenities and spacious living area. Perfect balance of comfort and value.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop',
    price: 599,
    features: [
      'Dual panoramic viewports',
      'Luxury sleeping quarters',
      'Private bathroom with space shower',
      'Entertainment system',
      'Premium nutrition station',
      'Workspace area',
      'Enhanced life support systems'
    ],
    maxOccupancy: 3
  },
  {
    id: 'premium',
    name: 'Galaxy Presidential Suite',
    description: 'Ultimate luxury space accommodation with premium amenities, private observation deck, and personalized service.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop',
    price: 1299,
    features: [
      '360° observation dome',
      'Master bedroom with anti-gravity bed',
      'Private space balcony',
      'Personal AI assistant',
      'Gourmet space cuisine service',
      'Private spa and relaxation chamber',
      'Exclusive spacewalk preparation area',
      'VIP concierge service'
    ],
    maxOccupancy: 4
  }
];

interface SearchResultsProps {
  searchData: SearchData;
  onClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchData, onClearSearch }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showRoomBooking, setShowRoomBooking] = useState<string | null>(null);

  // Filter destinations based on search criteria
  const filteredDestinations = destinationsData.destinations.filter((destination: Destination) => {
    // Match the destination ID with the search destination
    return destination.id === searchData.destination;
  });

  if (filteredDestinations.length === 0) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <h2>No Results Found</h2>
          <button onClick={onClearSearch} className="clear-search-btn">
            New Search
          </button>
        </div>
        <div className="no-results">
          <p>No destinations match your search criteria for "{searchData.destination}"</p>
          <p>Please try searching for a different destination.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (arrivalDate: string, returnDate: string) => {
    const arrival = new Date(arrivalDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD.getTime() - arrival.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = calculateDuration(searchData.arrivalDate, searchData.returnDate);

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>
          Space Vacation Results
          <span className="results-count">({filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found)</span>
        </h2>
        <button onClick={onClearSearch} className="clear-search-btn">
          <span className="btn-icon">🔍</span>
          New Search
        </button>
      </div>

      <div className="search-summary">
        <div className="search-summary-item">
          <span className="summary-icon">👥</span>
          <div>
            <strong>{searchData.numberOfPeople}</strong>
            <span> traveler{searchData.numberOfPeople !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="search-summary-item">
          <span className="summary-icon">📅</span>
          <div>
            <strong>{formatDate(searchData.arrivalDate)}</strong>
            <span> → {formatDate(searchData.returnDate)}</span>
          </div>
        </div>
        <div className="search-summary-item">
          <span className="summary-icon">⏱️</span>
          <div>
            <strong>{duration} days</strong>
            <span> duration</span>
          </div>
        </div>
      </div>

      <div className="destinations-results">
        {filteredDestinations.map((destination: Destination) => (
          <div key={destination.id} className="result-card">
            <div className="result-image-container">
              <img 
                src={destination.image} 
                alt={destination.title}
                className="result-image"
              />
              <div className="result-badge">
                <span>Perfect Match</span>
              </div>
            </div>
            
            <div className="result-content">
              <div className="result-header">
                <h3 className="result-title">{destination.title}</h3>
                <div className="result-price">
                  <span className="price-from">From</span>
                  <span className="price-amount">€{(Math.random() * 50000 + 10000).toFixed(0)}</span>
                  <span className="price-per">per person</span>
                </div>
              </div>
              
              <p className="result-description">{destination.description}</p>
              
              <div className="hotel-info">
                <h4 className="hotel-name">
                  <span className="hotel-icon">🏨</span>
                  {destination.hotel.name}
                </h4>
                <p className="hotel-description">{destination.hotel.description}</p>
                
                <div className="amenities-preview">
                  <span className="amenities-label">Included amenities:</span>
                  <div className="amenities-list">
                    {destination.hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                    {destination.hotel.amenities.length > 3 && (
                      <span className="amenity-tag more">
                        +{destination.hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="good-to-know">
                <h4>
                  <span className="info-icon">💡</span>
                  Good to Know
                </h4>
                <ul className="info-list">
                  {destination.goodToKnow.slice(0, 3).map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                  {destination.goodToKnow.length > 3 && (
                    <li className="more-info">
                      and {destination.goodToKnow.length - 3} more important facts...
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="result-actions">
                <button 
                  className="book-now-btn"
                  onClick={() => setShowRoomBooking(showRoomBooking === destination.id ? null : destination.id)}
                >
                  <span className="btn-icon">🚀</span>
                  {showRoomBooking === destination.id ? 'Hide Room Options' : 'Book This Adventure'}
                </button>
                <button className="view-details-btn">
                  View Full Details
                </button>
              </div>
              
              {showRoomBooking === destination.id && (
                <div className="room-booking-section">
                  <h3 className="room-section-title">
                    <span className="room-icon">🛏️</span>
                    Choose Your Space Accommodation
                  </h3>
                  <p className="room-section-subtitle">
                    Select the perfect room for your {duration}-day adventure to {destination.title}
                  </p>
                  
                  <div className="room-types-grid">
                    {ROOM_TYPES.map((room) => (
                      <div 
                        key={room.id} 
                        className={`room-card ${selectedRoom === room.id ? 'selected' : ''}`}
                        onClick={() => setSelectedRoom(room.id)}
                      >
                        <div className="room-image-container">
                          <img 
                            src={room.image} 
                            alt={room.name}
                            className="room-image"
                          />
                          <div className="room-price-badge">
                            €{room.price}
                            <span className="price-period">per night</span>
                          </div>
                        </div>
                        
                        <div className="room-content">
                          <h4 className="room-name">{room.name}</h4>
                          <p className="room-description">{room.description}</p>
                          
                          <div className="room-details">
                            <div className="room-occupancy">
                              <span className="occupancy-icon">👥</span>
                              <span>Up to {room.maxOccupancy} travelers</span>
                            </div>
                            
                            <div className="room-total-price">
                              <span className="total-label">Total for {duration} nights:</span>
                              <span className="total-amount">€{(room.price * duration * searchData.numberOfPeople).toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="room-features">
                            <h5>Included Features:</h5>
                            <ul className="features-list">
                              {room.features.slice(0, 4).map((feature, index) => (
                                <li key={index}>
                                  <span className="feature-check">✓</span>
                                  {feature}
                                </li>
                              ))}
                              {room.features.length > 4 && (
                                <li className="more-features">
                                  +{room.features.length - 4} more features...
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          <button 
                            className={`select-room-btn ${selectedRoom === room.id ? 'selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoom(room.id);
                            }}
                          >
                            {selectedRoom === room.id ? 'Selected ✓' : 'Select This Room'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedRoom && (
                    <div className="booking-summary">
                      <div className="summary-content">
                        <h4>Booking Summary</h4>
                        <div className="summary-details">
                          <div className="summary-item">
                            <span>Destination:</span>
                            <span>{destination.title}</span>
                          </div>
                          <div className="summary-item">
                            <span>Room:</span>
                            <span>{ROOM_TYPES.find(r => r.id === selectedRoom)?.name}</span>
                          </div>
                          <div className="summary-item">
                            <span>Dates:</span>
                            <span>{formatDate(searchData.arrivalDate)} - {formatDate(searchData.returnDate)}</span>
                          </div>
                          <div className="summary-item">
                            <span>Travelers:</span>
                            <span>{searchData.numberOfPeople} person{searchData.numberOfPeople !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="summary-item total">
                            <span>Total Cost:</span>
                            <span>€{(ROOM_TYPES.find(r => r.id === selectedRoom)!.price * duration * searchData.numberOfPeople).toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <button className="confirm-booking-btn">
                          <span className="btn-icon">🚀</span>
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
