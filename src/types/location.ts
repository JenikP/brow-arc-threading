
export interface LocationHours {
  [key: string]: string;
}

export interface LocationData {
  id: number;
  storeId: string;
  name: string;
  address: string;
  description?: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  image: string;
  hours: LocationHours;
  directionsUrl?: string;
}
