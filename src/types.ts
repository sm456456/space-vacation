export interface Destination {
  id: string;
  title: string;
  description: string;
  image: string;
  hotel: {
    name: string;
    description: string;
    amenities: string[];
  };
  goodToKnow: string[];
}
