import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { DepartureScreen } from "../screens/Departure";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="homeScreen" component={HomeScreen} />
      <Screen name="departureScreen" component={DepartureScreen} />
    </Navigator>
  )
}