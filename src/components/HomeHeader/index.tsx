import { TouchableOpacity } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp, useUser } from "@realm/react";

import { Power } from "phosphor-react-native";

import { useTheme } from "../../theme/stitches.config";

import { Greeting, HomeHeaderContainer, Message, Name, Picture } from "./styles";

export function HomeHeader() {
  const user = useUser();
  const app = useApp()
  const theme = useTheme();
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 32;
  
  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <HomeHeaderContainer style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofa}of00ayfQay~qj[fQj@"
      />

      <Greeting>
        <Message>Olá</Message>

        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.colors.GRAY_400} />
      </TouchableOpacity>
    </HomeHeaderContainer>
  )
}