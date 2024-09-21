import { useRef, useState } from 'react';

import { Alert, ScrollView, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useUser } from '@realm/react';

import { useRealm } from '../../libs/realm';

import { Historic } from '../../libs/realm/schemas/Historic';

import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { DepartureContainer, DepartureContent } from './styles';

export function DepartureScreen() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor informe a placa correta do veículo',
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização veículo',
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        );
      });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert('Erro', 'Não foi possível realizar a saída do veículo');

      setIsRegistering(false);
    }
  }

  return (
    <DepartureContainer>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <DepartureContent>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              returnKeyType="next"
              onChangeText={setLicensePlate}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              onChangeText={setDescription}
              onSubmitEditing={() => {
                handleDepartureRegister();
              }}
              /**
               * por ser multine para que não quebre a linha caso toque
               * no botão send do teclado
               */
              blurOnSubmit
            />

            <Button
              title="Registrar Saída"
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
            />
          </DepartureContent>
        </ScrollView>
      </KeyboardAwareScrollView>
    </DepartureContainer>
  );
}
