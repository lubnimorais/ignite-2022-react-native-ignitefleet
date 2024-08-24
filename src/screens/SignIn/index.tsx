
import { useCallback, useState } from 'react';

import { Alert } from 'react-native';

import { GoogleSignin} from '@react-native-google-signin/google-signin'

import { Realm, useApp } from '@realm/react'

import backgroundImg from '../../assets/background.png';

import { Button } from '../../components/Button';

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';

import { SignInContainer, SignInSlogan, SignInTitle } from './styles';

// DEFININDO AS CONFIGURAÇÕES DE AUTENTICAÇÃO
GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

export function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setIsAuthenticating(true)

      const { idToken} = await GoogleSignin.signIn()

      if (idToken) {
        /**
         * CRIAR CREDENCIAL PARA CONECTAR O USUÁRIO NA APLICAÇÃO
         */
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')

        setIsAuthenticating(false)
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')

      setIsAuthenticating(false)

    }
  }, [])

  return (
    <SignInContainer source={backgroundImg}>
      <SignInTitle>Ignite Fleet</SignInTitle>

      <SignInSlogan>Gestão de uso de veículos</SignInSlogan>

      <Button 
        title="Entrar com o Google" 
        isLoading={isAuthenticating} 
        onPress={handleGoogleSignIn} 
      />

    </SignInContainer>
  );
}


