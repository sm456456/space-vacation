import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="destination-card">
      <img 
        src={destination.image} 
        alt={destination.title}
        className="destination-image"
      />
      <div className="destination-content">
        <h2>{destination.title}</h2>
        <p className="description">{destination.description}</p>
        
        <div className="hotel-section">
          <h3>Hotel: {destination.hotel.name}</h3>
          <p>{destination.hotel.description}</p>
          <div className="amenities">
            <h4>Amenities:</h4>
            <ul>
              {destination.hotel.amenities.map((amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tips-section">
          <h4>Good to Know:</h4>
          <ul>
            {destination.goodToKnow.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
