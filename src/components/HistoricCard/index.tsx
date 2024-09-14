import { TouchableOpacityProps } from 'react-native';

import { Check, ClockClockwise } from 'phosphor-react-native';

import { useTheme } from '../../theme/stitches.config';

import { Departure, HistoricCardContainer, Info, LicensePlate } from './styles';

export interface IHistoric {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
}

interface IHistoricCardProps extends TouchableOpacityProps {
  data: IHistoric;
}

export function HistoricCard({ data, ...rest }: IHistoricCardProps) {
  const theme = useTheme();

  return (
    <HistoricCardContainer {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>

        <Departure>{data.created}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={theme.colors.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={theme.colors.GRAY_400} />
      )}
    </HistoricCardContainer>
  );
}
