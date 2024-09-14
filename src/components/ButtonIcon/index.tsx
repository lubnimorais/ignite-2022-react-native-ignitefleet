import { TouchableOpacityProps } from 'react-native';

import { IconProps } from 'phosphor-react-native';

import { useTheme } from '../../theme/stitches.config';

import { ButtonIconContainer } from './styles';

// TIPAGEM PARA UTILIZAR O ÍCONE DE FORMA DINÂMICA
export type IIconBoxProps = (props: IconProps) => JSX.Element;

type IButtonIconProps = TouchableOpacityProps & {
  icon: IIconBoxProps;
};

export function ButtonIcon({ icon: Icon, ...rest }: IButtonIconProps) {
  const theme = useTheme();

  return (
    <ButtonIconContainer activeOpacity={0.7} {...rest}>
      <Icon size={24} color={theme.colors.BRAND_MID} />
    </ButtonIconContainer>
  );
}
