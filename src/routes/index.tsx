import { NavigationContainer } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';

import { toastConfig } from '../config/toastConfig';

import { AppRoutes } from './app.routes';

export function Routes() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast config={toastConfig} topOffset={insets.top} />
    </NavigationContainer>
  );
}
