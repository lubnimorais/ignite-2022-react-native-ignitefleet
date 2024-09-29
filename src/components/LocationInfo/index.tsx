import { IconBox, IIconProps } from '../IconBox';

import { Description, Info, Label, LocationInfoContainer } from './styles';

export interface ILocationInfo {
  label: string;
  description: string;
}

interface ILocationInfoProps extends ILocationInfo {
  icon: IIconProps;
}

export function LocationInfo({ icon, label, description }: ILocationInfoProps) {
  return (
    <LocationInfoContainer>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </LocationInfoContainer>
  );
}
