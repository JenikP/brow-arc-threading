
export interface LocationHours {
  [key: string]: string;
}

export interface LocationData {
  id: number;
  storeId: string;
  slug: string;
  name: string;
  address: string;
  description?: string;
  tagline?: string;
  neighborhood?: string;
  landmarks?: string[];
  popularServices?: string[];
  gallery?: string[];
  coordinates: { lat: number; lng: number };
  phone: string;
  image: string;
  hours: LocationHours;
  directionsUrl?: string;
  mallDirections?: string;
}
