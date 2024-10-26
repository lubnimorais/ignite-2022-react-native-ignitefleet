import { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { LatLng } from 'react-native-maps';

import { X } from 'phosphor-react-native';

import { BSON } from 'realm';

import { useRealm } from '@realm/react';

import dayjs from 'dayjs';

import { useObject } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { getLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import { getStorageLocations } from '../../libs/asyncStorage/locationStorage';

import { stopLocationTask } from '../../tasks/backgroundLocationTask';

import { getAddressLocation } from '../../utils/getAddressLocation';

import { Header } from '../../components/Header';
import { Map } from '../../components/Map';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Locations } from '../../components/Locations';
import { ILocationInfo } from '../../components/LocationInfo';

import {
  ArrivalContainer,
  ArrivalContent,
  AsyncMessage,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles';

type IRouteParamsProps = {
  id: string;
};

export function ArrivalScreen() {
  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [departure, setDeparture] = useState<ILocationInfo>(
    {} as ILocationInfo,
  );
  const [arrival, setArrival] = useState<ILocationInfo | null>(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { id: vehicleId } = route.params as IRouteParamsProps;

  const realm = useRealm();

  const historic = useObject(
    Historic,
    new BSON.UUID(vehicleId) as unknown as string,
  );

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();

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

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo',
        );
      }

      const locations = await getStorageLocations();

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
        historic.coords.push(...locations);
      });

      // PARANDO A TAREFA DE LOCALIZAÇÃO EM BACKGROUND
      await stopLocationTask();

      Alert.alert('Chegada', 'Chegada realizada com sucesso!');

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo');
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return;
    }

    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic!.updated_at.getTime();

    setDataNotSynced(updatedAt > lastSync);

    if (historic.status === 'departure') {
      const locationsStorage = await getStorageLocations();
      setCoordinates(locationsStorage);
    } else {
      setCoordinates(historic.coords ?? []);
    }

    if (historic.coords[0]) {
      const departureStreetName = await getAddressLocation(historic.coords[0]);
      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(historic.coords[0].timestamp)).format(
          'DD/MM/YYYY [às] HH:mm ',
        ),
      });
    }

    if (historic.status === 'arrival') {
      const lastLocation = historic.coords[historic.coords.length - 1];
      const arrivalStreetName = await getAddressLocation(lastLocation);
      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''}`,
        description: dayjs(new Date(lastLocation.timestamp)).format(
          'DD/MM/YYYY [às] HH:mm ',
        ),
      });
    }
  }

  useEffect(() => {
    getLocationsInfo();
  }, [historic]);

  return (
    <ArrivalContainer>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <ArrivalContent>
        <Locations departure={departure} arrival={arrival} />

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
