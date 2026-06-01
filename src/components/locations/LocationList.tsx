
import { FC } from 'react';
import LocationCard from './LocationCard';
import { LocationData } from '../../types/location';

interface LocationListProps {
  locations: LocationData[];
  selectedLocation: number | null;
  onLocationSelect: (id: number) => void;
}

const LocationList: FC<LocationListProps> = ({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          isSelected={selectedLocation === location.id}
          onClick={() => {
            onLocationSelect(location.id === selectedLocation ? null : location.id);
          }}
        />
      ))}
    </div>
  );
};

export default LocationList;
