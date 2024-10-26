import { Car, FlagCheckered } from 'phosphor-react-native';

import { LocationInfo, ILocationInfo } from '../LocationInfo';

import { LocationsContainer, Line } from './styles';

interface ILocationsProps {
  departure: ILocationInfo;
  arrival?: ILocationInfo | null;
}

export function Locations({ departure, arrival = null }: ILocationsProps) {
  return (
    <LocationsContainer>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <>
          <Line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </LocationsContainer>
  );
}
