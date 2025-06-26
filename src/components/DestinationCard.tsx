import React from "react";
import { Destination } from "../types";

interface DestinationCardProps {
    destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    // Debug: Log the destination data
    console.log("Destination data:", destination);
    console.log("Amenities:", destination.hotel?.amenities);
    console.log("Good to know:", destination.goodToKnow);

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
                            {(destination.hotel?.amenities || []).map(
                                (amenity: string, index: number) => (
                                    <li
                                        key={`amenity-${destination.id}-${index}`}
                                    >
                                        {amenity}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>

                <div className="tips-section">
                    <h4>Good to Know:</h4>
                    <ul>
                        {(destination.goodToKnow || []).map(
                            (tip: string, index: number) => (
                                <li
                                    key={`tip-${destination.id}-${index}`}
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        margin: "5px 0",
                                    }}
                                >
                                    {tip}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
