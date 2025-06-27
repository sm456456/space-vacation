import React, { useState } from "react";
import { Destination } from "../types";
import { SearchData } from "../SearchForm";
import destinationsData from "../destinations.json";
import BookingConfirmation from "./BookingConfirmation";
import "./SearchResults.css";

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
        id: "affordable",
        name: "Cosmic Pod",
        description:
            "Cozy and efficient space accommodation perfect for budget-conscious space travelers. Features panoramic viewport and essential amenities.",
        image: "https://i.pinimg.com/736x/93/85/af/9385af1c46489c4a5a978e98fadf3115.jpg",
        price: 299,
        features: [
            "Panoramic space viewport",
            "Climate-controlled environment",
            "Personal storage compartment",
            "Emergency communication system",
            "Basic nutrition station",
        ],
        maxOccupancy: 2,
    },
    {
        id: "regular",
        name: "Stellar Suite",
        description:
            "Comfortable mid-tier accommodation with enhanced amenities and spacious living area. Perfect balance of comfort and value.",
        image: "https://images.nightcafe.studio/jobs/C8DpwMC4SZTeSjg8jcDw/C8DpwMC4SZTeSjg8jcDw--1--wl4to.jpg?tr=w-1600,c-at_max",
        price: 599,
        features: [
            "Dual panoramic viewports",
            "Luxury sleeping quarters",
            "Private bathroom with space shower",
            "Entertainment system",
            "Premium nutrition station",
            "Workspace area",
            "Enhanced life support systems",
        ],
        maxOccupancy: 3,
    },
    {
        id: "premium",
        name: "Galaxy Presidential Suite",
        description:
            "Ultimate luxury space accommodation with premium amenities, private observation deck, and personalized service.",
        image: "https://infonaijahub.com.ng/wp-content/uploads/2024/02/Internet_20240211_081928_2.jpeg",
        price: 1299,
        features: [
            "360° observation dome",
            "Master bedroom with anti-gravity bed",
            "Private space balcony",
            "Personal AI assistant",
            "Gourmet space cuisine service",
            "Private spa and relaxation chamber",
            "Exclusive spacewalk preparation area",
            "VIP concierge service",
        ],
        maxOccupancy: 4,
    },
];

interface ExtraItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: "spacesuit" | "vehicle";
    included?: boolean;
}

const EXTRA_ITEMS: ExtraItem[] = [
    // Space Suits
    {
        id: "regular-suit",
        name: "Standard Space Suit",
        description:
            "Basic EVA suit with life support systems, radiation protection, and communication equipment. Included with all bookings.",
        image: "https://www.fodors.com/wp-content/uploads/2017/09/Space-Hotels-Fantasyland-Hotel-4-975x650.jpg",
        price: 0,
        category: "spacesuit",
        included: true,
    },
    {
        id: "premium-suit",
        name: "Premium Space Suit",
        description:
            "Advanced EVA suit with enhanced mobility, extended life support, heads-up display, and premium comfort padding.",
        image: "https://img.freepik.com/premium-photo/luxurious-space-hotel-interior-with-earth-views_416256-30418.jpg",
        price: 299,
        category: "spacesuit",
    },
    {
        id: "vader-suit",
        name: "Darth Vader Themed Suit",
        description:
            "Epic black space suit with Vader-inspired design, dramatic breathing system, and intimidating presence. May the force be with you!",
        image: "https://th.bing.com/th/id/R.52311cd55fd937949be628ba6df41a3e?rik=eASoubW7p11oXw&pid=ImgRaw&r=0",
        price: 599,
        category: "spacesuit",
    },
    // Vehicles
    {
        id: "space-buggy",
        name: "Space Exploration Buggy",
        description:
            "All-terrain space vehicle for surface exploration. Features pressurized cabin, scientific equipment, and 8-hour battery life.",
        image: "https://th.bing.com/th/id/R.112e2c19960b4c8b05c98e11b7212905?rik=na241Cm3I0L9mA&pid=ImgRaw&r=0",
        price: 199,
        category: "vehicle",
    },
];

interface SearchResultsProps {
    searchData: SearchData;
    onClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
    searchData,
    onClearSearch,
}) => {
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [showRoomBooking, setShowRoomBooking] = useState<string | null>(null);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([
        "regular-suit",
    ]); // Regular suit included by default
    const [showBookingConfirmation, setShowBookingConfirmation] =
        useState(false);
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    const handleExtraToggle = (extraId: string) => {
        if (extraId === "regular-suit") return; // Can't remove included items

        setSelectedExtras(prev =>
            prev.includes(extraId)
                ? prev.filter(id => id !== extraId)
                : [...prev, extraId]
        );
    };

    const handleConfirmBooking = (destination: Destination) => {
        if (!selectedRoom) return;

        const selectedRoomData = ROOM_TYPES.find(r => r.id === selectedRoom)!;
        const duration = calculateDuration(
            searchData.arrivalDate,
            searchData.returnDate
        );

        // Calculate total cost
        const roomCost =
            selectedRoomData.price * duration * searchData.numberOfPeople;
        const extrasCost = selectedExtras.reduce((sum, extraId) => {
            const extra = EXTRA_ITEMS.find(e => e.id === extraId);
            if (!extra || extra.included) return sum;
            const multiplier =
                extra.category === "vehicle"
                    ? duration
                    : searchData.numberOfPeople;
            return sum + extra.price * multiplier;
        }, 0);

        const totalCost = roomCost + extrasCost;

        // Prepare booking details
        const details = {
            destination: destination.title,
            room: selectedRoomData.name,
            dates: `${formatDate(searchData.arrivalDate)} - ${formatDate(
                searchData.returnDate
            )}`,
            travelers: searchData.numberOfPeople,
            totalCost: `€${totalCost.toLocaleString()}`,
        };

        setBookingDetails(details);
        setShowBookingConfirmation(true);
    };

    // Filter destinations based on search criteria
    const filteredDestinations = destinationsData.destinations.filter(
        (destination: Destination) => {
            // Match the destination ID with the search destination
            return destination.id === searchData.destination;
        }
    );

    if (filteredDestinations.length === 0) {
        return (
            <div className="search-results">
                <div className="search-results-header">
                    <h2>No Results Found</h2>
                    <button
                        onClick={onClearSearch}
                        className="clear-search-btn"
                    >
                        New Search
                    </button>
                </div>
                <div className="no-results">
                    <p>
                        No destinations match your search criteria for "
                        {searchData.destination}"
                    </p>
                    <p>Please try searching for a different destination.</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateDuration = (arrivalDate: string, returnDate: string) => {
        const arrival = new Date(arrivalDate);
        const returnD = new Date(returnDate);
        const diffTime = Math.abs(returnD.getTime() - arrival.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const duration = calculateDuration(
        searchData.arrivalDate,
        searchData.returnDate
    );

    return (
        <div className="search-results">
            <div className="search-results-header">
                <h2>
                    Space Vacation Results
                    <span className="results-count">
                        ({filteredDestinations.length} destination
                        {filteredDestinations.length !== 1 ? "s" : ""} found)
                    </span>
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
                        <span>
                            {" "}
                            traveler{searchData.numberOfPeople !== 1 ? "s" : ""}
                        </span>
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
                                <h3 className="result-title">
                                    {destination.title}
                                </h3>
                                <div className="result-price">
                                    <span className="price-from">From</span>
                                    <span className="price-amount">
                                        €
                                        {(
                                            Math.random() * 50000 +
                                            10000
                                        ).toFixed(0)}
                                    </span>
                                    <span className="price-per">
                                        per person
                                    </span>
                                </div>
                            </div>

                            <p className="result-description">
                                {destination.description}
                            </p>

                            <div className="hotel-info">
                                <h4 className="hotel-name">
                                    <span className="hotel-icon">🏨</span>
                                    {destination.hotel.name}
                                </h4>
                                <p className="hotel-description">
                                    {destination.hotel.description}
                                </p>

                                <div className="amenities-preview">
                                    <span className="amenities-label">
                                        Included amenities:
                                    </span>
                                    <div className="amenities-list">
                                        {destination.hotel.amenities
                                            .slice(0, 3)
                                            .map((amenity, index) => (
                                                <span
                                                    key={index}
                                                    className="amenity-tag"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        {destination.hotel.amenities.length >
                                            3 && (
                                            <span className="amenity-tag more">
                                                +
                                                {destination.hotel.amenities
                                                    .length - 3}{" "}
                                                more
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
                                    {destination.goodToKnow
                                        .slice(0, 3)
                                        .map((info, index) => (
                                            <li key={index}>{info}</li>
                                        ))}
                                    {destination.goodToKnow.length > 3 && (
                                        <li className="more-info">
                                            and{" "}
                                            {destination.goodToKnow.length - 3}{" "}
                                            more important facts...
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="result-actions">
                                <button
                                    className="book-now-btn"
                                    onClick={() =>
                                        setShowRoomBooking(
                                            showRoomBooking === destination.id
                                                ? null
                                                : destination.id
                                        )
                                    }
                                >
                                    <span className="btn-icon">🚀</span>
                                    {showRoomBooking === destination.id
                                        ? "Hide Room Options"
                                        : "Book This Adventure"}
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
                                        Select the perfect room for your{" "}
                                        {duration}-day adventure to{" "}
                                        {destination.title}
                                    </p>

                                    <div className="room-types-grid">
                                        {ROOM_TYPES.map(room => (
                                            <div
                                                key={room.id}
                                                className={`room-card ${
                                                    selectedRoom === room.id
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedRoom(room.id)
                                                }
                                            >
                                                <div className="room-image-container">
                                                    <img
                                                        src={room.image}
                                                        alt={room.name}
                                                        className="room-image"
                                                    />
                                                    <div className="room-price-badge">
                                                        €{room.price}
                                                        <span className="price-period">
                                                            per night
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="room-content">
                                                    <h4 className="room-name">
                                                        {room.name}
                                                    </h4>
                                                    <p className="room-description">
                                                        {room.description}
                                                    </p>

                                                    <div className="room-details">
                                                        <div className="room-occupancy">
                                                            <span className="occupancy-icon">
                                                                👥
                                                            </span>
                                                            <span>
                                                                Up to{" "}
                                                                {
                                                                    room.maxOccupancy
                                                                }{" "}
                                                                travelers
                                                            </span>
                                                        </div>

                                                        <div className="room-total-price">
                                                            <span className="total-label">
                                                                Total for{" "}
                                                                {duration}{" "}
                                                                nights:
                                                            </span>
                                                            <span className="total-amount">
                                                                €
                                                                {(
                                                                    room.price *
                                                                    duration *
                                                                    searchData.numberOfPeople
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="room-features">
                                                        <h5>
                                                            Included Features:
                                                        </h5>
                                                        <ul className="features-list">
                                                            {room.features
                                                                .slice(0, 4)
                                                                .map(
                                                                    (
                                                                        feature,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <span className="feature-check">
                                                                                ✓
                                                                            </span>
                                                                            {
                                                                                feature
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            {room.features
                                                                .length > 4 && (
                                                                <li className="more-features">
                                                                    +
                                                                    {room
                                                                        .features
                                                                        .length -
                                                                        4}{" "}
                                                                    more
                                                                    features...
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    <button
                                                        className={`select-room-btn ${
                                                            selectedRoom ===
                                                            room.id
                                                                ? "selected"
                                                                : ""
                                                        }`}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setSelectedRoom(
                                                                room.id
                                                            );
                                                        }}
                                                    >
                                                        {selectedRoom ===
                                                        room.id
                                                            ? "Selected ✓"
                                                            : "Select This Room"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {selectedRoom && (
                                        <div className="extras-section">
                                            <h3 className="extras-title">
                                                <span className="extras-icon">
                                                    🛰️
                                                </span>
                                                Enhance Your Space Adventure
                                            </h3>
                                            <p className="extras-subtitle">
                                                Add extra equipment and
                                                experiences to make your trip
                                                unforgettable
                                            </p>

                                            <div className="extras-categories">
                                                {/* Space Suits Section */}
                                                <div className="extras-category">
                                                    <h4 className="category-title">
                                                        <span className="category-icon">
                                                            👨‍🚀
                                                        </span>
                                                        Space Suits
                                                    </h4>
                                                    <div className="extras-grid">
                                                        {EXTRA_ITEMS.filter(
                                                            item =>
                                                                item.category ===
                                                                "spacesuit"
                                                        ).map(extra => (
                                                            <div
                                                                key={extra.id}
                                                                className={`extra-card ${
                                                                    selectedExtras.includes(
                                                                        extra.id
                                                                    )
                                                                        ? "selected"
                                                                        : ""
                                                                } ${
                                                                    extra.included
                                                                        ? "included"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handleExtraToggle(
                                                                        extra.id
                                                                    )
                                                                }
                                                            >
                                                                <div className="extra-image-container">
                                                                    <img
                                                                        src={
                                                                            extra.image
                                                                        }
                                                                        alt={
                                                                            extra.name
                                                                        }
                                                                        className="extra-image"
                                                                    />
                                                                    {extra.included && (
                                                                        <div className="included-badge">
                                                                            <span>
                                                                                ✓
                                                                                Included
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {!extra.included && (
                                                                        <div className="extra-price-badge">
                                                                            €
                                                                            {
                                                                                extra.price
                                                                            }
                                                                            <span className="price-period">
                                                                                per
                                                                                person
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="extra-content">
                                                                    <h5 className="extra-name">
                                                                        {
                                                                            extra.name
                                                                        }
                                                                    </h5>
                                                                    <p className="extra-description">
                                                                        {
                                                                            extra.description
                                                                        }
                                                                    </p>

                                                                    {!extra.included && (
                                                                        <div className="extra-selection">
                                                                            <button
                                                                                className={`extra-toggle-btn ${
                                                                                    selectedExtras.includes(
                                                                                        extra.id
                                                                                    )
                                                                                        ? "selected"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={e => {
                                                                                    e.stopPropagation();
                                                                                    handleExtraToggle(
                                                                                        extra.id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {selectedExtras.includes(
                                                                                    extra.id
                                                                                )
                                                                                    ? "Remove"
                                                                                    : "Add to Trip"}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Vehicles Section */}
                                                <div className="extras-category">
                                                    <h4 className="category-title">
                                                        <span className="category-icon">
                                                            🚗
                                                        </span>
                                                        Exploration Vehicles
                                                    </h4>
                                                    <div className="extras-grid">
                                                        {EXTRA_ITEMS.filter(
                                                            item =>
                                                                item.category ===
                                                                "vehicle"
                                                        ).map(extra => (
                                                            <div
                                                                key={extra.id}
                                                                className={`extra-card ${
                                                                    selectedExtras.includes(
                                                                        extra.id
                                                                    )
                                                                        ? "selected"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handleExtraToggle(
                                                                        extra.id
                                                                    )
                                                                }
                                                            >
                                                                <div className="extra-image-container">
                                                                    <img
                                                                        src={
                                                                            extra.image
                                                                        }
                                                                        alt={
                                                                            extra.name
                                                                        }
                                                                        className="extra-image"
                                                                    />
                                                                    <div className="extra-price-badge">
                                                                        €
                                                                        {
                                                                            extra.price
                                                                        }
                                                                        <span className="price-period">
                                                                            per
                                                                            day
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="extra-content">
                                                                    <h5 className="extra-name">
                                                                        {
                                                                            extra.name
                                                                        }
                                                                    </h5>
                                                                    <p className="extra-description">
                                                                        {
                                                                            extra.description
                                                                        }
                                                                    </p>

                                                                    <div className="extra-selection">
                                                                        <button
                                                                            className={`extra-toggle-btn ${
                                                                                selectedExtras.includes(
                                                                                    extra.id
                                                                                )
                                                                                    ? "selected"
                                                                                    : ""
                                                                            }`}
                                                                            onClick={e => {
                                                                                e.stopPropagation();
                                                                                handleExtraToggle(
                                                                                    extra.id
                                                                                );
                                                                            }}
                                                                        >
                                                                            {selectedExtras.includes(
                                                                                extra.id
                                                                            )
                                                                                ? "Remove"
                                                                                : "Add to Trip"}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedRoom && (
                                        <div className="booking-summary">
                                            <div className="summary-content">
                                                <h4>Booking Summary</h4>
                                                <div className="summary-details">
                                                    <div className="summary-item">
                                                        <span>
                                                            Destination:
                                                        </span>
                                                        <span>
                                                            {destination.title}
                                                        </span>
                                                    </div>
                                                    <div className="summary-item">
                                                        <span>Room:</span>
                                                        <span>
                                                            {
                                                                ROOM_TYPES.find(
                                                                    r =>
                                                                        r.id ===
                                                                        selectedRoom
                                                                )?.name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="summary-item">
                                                        <span>Dates:</span>
                                                        <span>
                                                            {formatDate(
                                                                searchData.arrivalDate
                                                            )}{" "}
                                                            -{" "}
                                                            {formatDate(
                                                                searchData.returnDate
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="summary-item">
                                                        <span>Travelers:</span>
                                                        <span>
                                                            {
                                                                searchData.numberOfPeople
                                                            }{" "}
                                                            person
                                                            {searchData.numberOfPeople !==
                                                            1
                                                                ? "s"
                                                                : ""}
                                                        </span>
                                                    </div>

                                                    {/* Room cost breakdown */}
                                                    <div className="summary-item">
                                                        <span>
                                                            Room ({duration}{" "}
                                                            nights):
                                                        </span>
                                                        <span>
                                                            €
                                                            {(
                                                                ROOM_TYPES.find(
                                                                    r =>
                                                                        r.id ===
                                                                        selectedRoom
                                                                )!.price *
                                                                duration *
                                                                searchData.numberOfPeople
                                                            ).toLocaleString()}
                                                        </span>
                                                    </div>

                                                    {/* Extras cost breakdown */}
                                                    {selectedExtras
                                                        .filter(extraId => {
                                                            const extra =
                                                                EXTRA_ITEMS.find(
                                                                    e =>
                                                                        e.id ===
                                                                        extraId
                                                                );
                                                            return (
                                                                extra &&
                                                                !extra.included
                                                            );
                                                        })
                                                        .map(extraId => {
                                                            const extra =
                                                                EXTRA_ITEMS.find(
                                                                    e =>
                                                                        e.id ===
                                                                        extraId
                                                                )!;
                                                            const multiplier =
                                                                extra.category ===
                                                                "vehicle"
                                                                    ? duration
                                                                    : searchData.numberOfPeople;
                                                            const cost =
                                                                extra.price *
                                                                multiplier;
                                                            return (
                                                                <div
                                                                    key={
                                                                        extraId
                                                                    }
                                                                    className="summary-item extra-item"
                                                                >
                                                                    <span>
                                                                        {
                                                                            extra.name
                                                                        }
                                                                        :
                                                                    </span>
                                                                    <span>
                                                                        €
                                                                        {cost.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}

                                                    <div className="summary-item total">
                                                        <span>Total Cost:</span>
                                                        <span>
                                                            €
                                                            {(
                                                                ROOM_TYPES.find(
                                                                    r =>
                                                                        r.id ===
                                                                        selectedRoom
                                                                )!.price *
                                                                    duration *
                                                                    searchData.numberOfPeople +
                                                                selectedExtras.reduce(
                                                                    (
                                                                        sum,
                                                                        extraId
                                                                    ) => {
                                                                        const extra =
                                                                            EXTRA_ITEMS.find(
                                                                                e =>
                                                                                    e.id ===
                                                                                    extraId
                                                                            );
                                                                        if (
                                                                            !extra ||
                                                                            extra.included
                                                                        )
                                                                            return sum;
                                                                        const multiplier =
                                                                            extra.category ===
                                                                            "vehicle"
                                                                                ? duration
                                                                                : searchData.numberOfPeople;
                                                                        return (
                                                                            sum +
                                                                            extra.price *
                                                                                multiplier
                                                                        );
                                                                    },
                                                                    0
                                                                )
                                                            ).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    className="confirm-booking-btn"
                                                    onClick={() =>
                                                        handleConfirmBooking(
                                                            destination
                                                        )
                                                    }
                                                >
                                                    <span className="btn-icon">
                                                        🚀
                                                    </span>
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

            {/* Booking Confirmation Modal */}
            {showBookingConfirmation && bookingDetails && (
                <BookingConfirmation
                    isVisible={showBookingConfirmation}
                    onClose={() => setShowBookingConfirmation(false)}
                    bookingDetails={bookingDetails}
                />
            )}
        </div>
    );
};

export default SearchResults;
