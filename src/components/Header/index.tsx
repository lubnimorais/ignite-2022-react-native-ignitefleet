import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeft } from "phosphor-react-native";

import { useTheme } from "../../theme/stitches.config";

import { HeaderContainer, Title } from "./styles";

type IHeaderProps = {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets();
  const navigation = useNavigation()

  const paddingTop = insets.top + 42

  return (
    <HeaderContainer style={{ paddingTop}}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <ArrowLeft
          size={24}
          weight="bold"
          color={theme.colors.BRAND_LIGHT}
        />
      </TouchableOpacity>

      <Title>{title}</Title>
    </HeaderContainer>
  )
}