import { IconProps } from 'phosphor-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/stitches.config';

import { TopMessageContainer, TopMessageTitle } from './styles';

export type IIconBoxProps = (props: IconProps) => JSX.Element;

interface ITopMessageProps {
  icon?: IIconBoxProps;
  title: string;
}

export function TopMessage({ icon: Icon, title }: ITopMessageProps) {
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;

  return (
    <TopMessageContainer style={{ paddingTop }}>
      {Icon && <Icon size={18} color={theme.colors.GRAY_100} />}

      <TopMessageTitle>{title}</TopMessageTitle>
    </TopMessageContainer>
  );
}
