import { IconProps } from 'phosphor-react-native';

import { useTheme } from '../../theme/stitches.config';

import { IconBoxContainer, ISizeProps } from './styles';

export type IIconProps = (props: IconProps) => JSX.Element;

interface IIconBoxProps {
  size?: ISizeProps;
  icon: IIconProps;
}

export function IconBox({ size = 'NORMAL', icon: Icon }: IIconBoxProps) {
  const theme = useTheme();

  const iconSize = size === 'NORMAL' ? 24 : 16;

  return (
    <IconBoxContainer size={size}>
      <Icon size={iconSize} color={theme.colors.BRAND_LIGHT} />
    </IconBoxContainer>
  );
}
