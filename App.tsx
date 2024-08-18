import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { AppProvider, UserProvider } from '@realm/react';

import { theme, ThemeProvider } from './src/theme/stitches.config';

import { REALM_APP_ID } from '@env';

import { SignInScreen } from './src/screens/SignIn';
import { HomeScreen } from './src/screens/Home';

import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts(
    { Roboto_400Regular, Roboto_700Bold }
  )

  if (!fontsLoaded) {
    return (
      <Loading /> 
    )
  }


  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {/**
         * SE NÃO TIVER NENHUM USUÁRIO LOGADO CHAMA A TELA SIGNIN
         * SE TIVER UM USUÁRIO LOGADO, ELE REDIRECIONA
         */}
        <UserProvider fallback={<SignInScreen />}>
          <HomeScreen />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}


