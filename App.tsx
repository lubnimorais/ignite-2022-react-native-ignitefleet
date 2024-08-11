import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { SignInScreen } from './src/screens/SignIn';

import { theme, ThemeProvider } from './src/theme/stitches.config';
import { Loading } from './src/components/Loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts(
    {Roboto_400Regular, Roboto_700Bold}
  )

 

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {!fontsLoaded ? <Loading /> : <SignInScreen />}
    </ThemeProvider>
  );
}


