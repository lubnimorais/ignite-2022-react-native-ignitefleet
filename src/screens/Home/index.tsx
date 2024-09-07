import { useNavigation } from "@react-navigation/native";

import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "../../components/HomeHeader";


import { HomeContainer, HomeContent } from "./styles";

export function HomeScreen() {
  const navigation = useNavigation();

  function handleRegisterMovement() {
    navigation.navigate('departureScreen')
  }

  return (
    <HomeContainer>
      <HomeHeader />

      <HomeContent>
        <CarStatus onPress={handleRegisterMovement} />
      </HomeContent>
    </HomeContainer>
  )
}