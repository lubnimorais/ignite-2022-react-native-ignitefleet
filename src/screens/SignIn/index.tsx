

import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';

import { SignInContainer, SignInSlogan, SignInTitle } from './styles';

export function SignInScreen() {
  return (
    <SignInContainer source={backgroundImg}>
      <SignInTitle>Ignite Fleet</SignInTitle>

      <SignInSlogan>Gestão de uso de veículos</SignInSlogan>

      <Button title="Entrar com o Google" />

    </SignInContainer>
  );
}


