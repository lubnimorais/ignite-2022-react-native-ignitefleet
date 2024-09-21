import { useCallback, useEffect, useState } from 'react';

import { Alert, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';

import { Realm, useQuery, useUser } from '@realm/react';
import { useRealm } from '../../libs/realm';

import { Historic } from '../../libs/realm/schemas/Historic';

import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from '../../libs/asyncStorage/syncStorage';

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { HistoricCard, IHistoric } from '../../components/HistoricCard';

import { HomeContainer, HomeContent, Label, Title } from './styles';

export function HomeScreen() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<IHistoric[]>([]);

  const navigation = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();
  const user = useUser();

  // FUNCTIONS
  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigation.navigate('arrivalScreen', {
        id: vehicleInUse._id.toString(),
      });
    } else {
      navigation.navigate('departureScreen');
    }
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      );

      const lastSync = await getLastSyncTimestamp();

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at.getTime(),
          created: dayjs(item.created_at).format(
            '[Saída em] DD/MM/YYYY [às] HH:mm',
          ),
        };
      });

      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);

      Alert.alert('Histórico', 'Não foi possível carregar o histórico');
    }
  }

  const fetchVehicleInUse = useCallback(() => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];

      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso',
      );

      console.log(error);
    }
  }, [historic]);

  function handleHistoricDetails(id: string) {
    navigation.navigate('arrivalScreen', { id });
  }

  async function progressNotification(
    transferred: number,
    transferable: number,
  ) {
    const percentage = (transferred / transferable) * 100;

    if (percentage === 100) {
      await saveLastSyncTimestamp();

      await fetchHistoric();
    }
  }
  // END FUNCTIONS

  useEffect(() => {
    fetchVehicleInUse();
  }, [fetchVehicleInUse]);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, [realm, fetchVehicleInUse]);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user.id}'`);

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) {
      return;
    }

    /**
     * 1 PARÂMETRO: QUAL DIREÇÃO QUE QUEREMOS OBTER (UPLOAD - SABER O 
     O QUANTO TEM QUE ENVIAR PARA O BANCO DE DADOS)
     * 2 PARÂMETRO: COMO QUEREMOS REPORTAR ESSA NOTIFICAÇÃO 
     * 3 PARÂMETRO: FUNÇÃO DE COMO VAI RECEBER ESSA NOTIFICAÇÃO
    */

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <HomeContainer>
      <HomeHeader />

      <HomeContent>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={vehicleHistoric}
          keyExtractor={(item) => item.licensePlate}
          renderItem={({ item: historic }) => (
            <HistoricCard
              data={{
                id: historic.id,
                licensePlate: historic.licensePlate,
                created: historic.created,
                isSync: historic.isSync,
              }}
              onPress={() => {
                handleHistoricDetails(historic.id);
              }}
            />
          )}
          ListEmptyComponent={() => <Label>Nenhum veículo utilizado</Label>}
        />
      </HomeContent>
    </HomeContainer>
  );
}
