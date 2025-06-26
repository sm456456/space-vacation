# Space Vacation 🚀

Your ultimate space travel experience awaits! Explore destinations across the solar system and plan your next interplanetary vacation.

## Overview

Space Vacation is a React-based web application that showcases fictional space tourism destinations. Users can browse through various celestial bodies, view luxury accommodations, and plan hypothetical space vacations with detailed information about each destination.

## Features

-   🌍 **Multiple Space Destinations**: Explore Mars, Moon, International Space Station, Venus, and more
-   🏨 **Luxury Space Hotels**: Each destination features unique accommodations with themed amenities
-   🔍 **Advanced Search**: Filter destinations by arrival/return dates and number of travelers
-   📋 **Detailed Information**: Learn about gravity, temperature, and important facts for each location
-   🎨 **Beautiful UI**: Modern, responsive design with stunning space imagery
-   📱 **Mobile Friendly**: Optimized for viewing on all device sizes

## Current Destinations

### Mars - Olympus Mons Resort

-   Experience the Red Planet's vast deserts and towering volcanoes
-   Features: Zero-gravity pool, Observatory, Martian rover rentals
-   Fun fact: Mars has about 38% of Earth's gravity

### Moon - Lunar Colony Resort

-   Explore the Sea of Tranquility and witness Earthrise
-   Features: Moon buggy tours, Lunar golf, Low-gravity gym
-   Fun fact: Jump 6 times higher than on Earth

### International Space Station - Orbital Habitat

-   Life in orbit with 16 sunrises per day
-   Features: Zero-gravity sleeping pods, Spacewalk training
-   Fun fact: Travels at 28,000 km/h around Earth

### Venus - Cloud City Resort

-   Floating accommodation in Venus' upper atmosphere
-   Features: Pressure-controlled suites, Cloud surfing
-   Fun fact: A day on Venus is longer than its year

## Technology Stack

-   **Frontend**: React 18.2.0 with TypeScript
-   **Build Tool**: Create React App
-   **Styling**: CSS3 with custom components
-   **Development**: Hot reload, ESLint, and modern build pipeline

## Getting Started

### Prerequisites

-   Node.js (version 16 or higher)
-   npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd space-vacation
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

-   `npm start` - Runs the app in development mode
-   `npm test` - Launches the test runner
-   `npm run build` - Builds the app for production
-   `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
space-vacation/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── components/
│   │   ├── DestinationCard.tsx
│   │   ├── DestinationsList.tsx
│   │   └── DestinationsList.css
│   ├── App.tsx
│   ├── App.css
│   ├── SearchForm.tsx
│   ├── SearchForm.css
│   ├── destinations.json
│   ├── types.ts
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

We welcome contributions to expand our solar system destinations! Here's how you can help:

1. **Add New Destinations**: Update `destinations.json` with new celestial bodies
2. **Improve UI/UX**: Enhance the visual design and user experience
3. **Add Features**: Implement booking functionality, user profiles, or trip planning
4. **Bug Fixes**: Report and fix any issues you encounter

### Adding a New Destination

To add a new space destination:

1. Add an entry to `src/destinations.json` following the existing structure:

```json
{
    "id": "unique-id",
    "title": "Destination Name",
    "description": "Compelling description",
    "image": "image-url",
    "hotel": {
        "name": "Hotel Name",
        "description": "Hotel description",
        "amenities": ["amenity1", "amenity2"]
    },
    "goodToKnow": ["fact1", "fact2"]
}
```

2. Optionally add the destination to the search form dropdown in `SearchForm.tsx`

## Future Enhancements

-   🛒 **Booking System**: Complete reservation and payment processing
-   👤 **User Accounts**: Save favorite destinations and trip history
-   🌟 **Reviews & Ratings**: Let space travelers share their experiences
-   📊 **Trip Planning**: Multi-destination itineraries and cost calculation
-   🎮 **Virtual Tours**: 3D previews of destinations and hotels
-   🛸 **Transportation Options**: Different spacecraft and travel classes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   Space imagery from Unsplash
-   Inspiration from real space tourism companies
-   Built with Create React App
-   TypeScript for enhanced development experience

---

Ready for your space adventure? Start exploring destinations and plan your next vacation among the stars! ✨
