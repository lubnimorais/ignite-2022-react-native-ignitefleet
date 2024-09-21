import 'react-native-get-random-values';

import './src/libs/dayjs';

import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import { AppProvider, UserProvider } from '@realm/react';

import { theme, ThemeProvider, useTheme } from './src/theme/stitches.config';

import { WifiSlash } from 'phosphor-react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { REALM_APP_ID } from '@env';

import { Routes } from './src/routes';

import { RealmProvider, syncConfig } from './src/libs/realm';

import { SignInScreen } from './src/screens/SignIn';

import { Loading } from './src/components/Loading';
import { TopMessage } from './src/components/TopMessage';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const netInfo = useNetInfo();

  const themeApp = useTheme();

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: themeApp.colors.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          {!netInfo.isConnected && (
            <TopMessage title="Você está off-line" icon={WifiSlash} />
          )}

          {/**
           * SE NÃO TIVER NENHUM USUÁRIO LOGADO CHAMA A TELA SIGNIN
           * SE TIVER UM USUÁRIO LOGADO, ELE REDIRECIONA
           */}
          <UserProvider fallback={<SignInScreen />}>
            {/* FALLBACK: ENQUANTO ESTÁ NO PROCESSO DE ABRIR
              O BANCO DE DADOS E COMEÇAR A SINCRONIZAÇÃO
              MOSTRA O COMPONENTE DE LOADING
             */}
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
