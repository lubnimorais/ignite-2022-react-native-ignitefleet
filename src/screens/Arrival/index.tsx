import { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { X } from 'phosphor-react-native';

import { BSON } from 'realm';

import { useRealm } from '@realm/react';

import { useObject } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';

import {
  ArrivalContainer,
  ArrivalContent,
  AsyncMessage,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles';
import { getLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage';

type IRouteParamsProps = {
  id: string;
};

export function ArrivalScreen() {
  const [dataNotSynced, setDataNotSynced] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id: vehicleId } = route.params as IRouteParamsProps;

  const realm = useRealm();

  const historic = useObject(
    Historic,
    new BSON.UUID(vehicleId) as unknown as string,
  );

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    navigation.goBack();
  }

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'Sim',
        onPress: () => {
          removeVehicleUsage();
        },
      },
    ]);
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo',
        );
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Chegada', 'Chegada realizada com sucesso!');

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo');
    }
  }

  useEffect(() => {
    getLastSyncTimestamp().then((lastSync) =>
      setDataNotSynced(historic!.updated_at.getTime() > lastSync),
    );
  }, []);

  return (
    <ArrivalContainer>
      <Header title={title} />

      <ArrivalContent>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </ArrivalContent>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da{' '}
          {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente
        </AsyncMessage>
      )}
    </ArrivalContainer>
  );
}
