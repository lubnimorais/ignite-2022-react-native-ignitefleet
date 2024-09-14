import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/Home';
import { DepartureScreen } from '../screens/Departure';
import { ArrivalScreen } from '../screens/Arrival';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="homeScreen" component={HomeScreen} />
      <Screen name="departureScreen" component={DepartureScreen} />
      <Screen name="arrivalScreen" component={ArrivalScreen} />
    </Navigator>
  );
}
