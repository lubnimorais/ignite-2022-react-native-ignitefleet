import { useCallback, useEffect, useState } from 'react';

import { Alert, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';

import { useQuery } from '@realm/react';
import { useRealm } from '../../libs/realm';

import { Historic } from '../../libs/realm/schemas/Historic';

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { HistoricCard, IHistoric } from '../../components/HistoricCard';

import { HomeContainer, HomeContent, Label } from './styles';

export function HomeScreen() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<IHistoric[]>([]);

  const navigation = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigation.navigate('arrivalScreen', {
        id: vehicleInUse._id.toString(),
      });
    } else {
      navigation.navigate('departureScreen');
    }
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      );

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
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

  useEffect(() => {
    fetchVehicleInUse();
  }, [fetchVehicleInUse]);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => realm.removeListener('change', fetchVehicleInUse);
  }, [realm, fetchVehicleInUse]);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <HomeContainer>
      <HomeHeader />

      <HomeContent>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

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
            />
          )}
          ListEmptyComponent={() => <Label>Nenhum veículo utilizado</Label>}
        />
      </HomeContent>
    </HomeContainer>
  );
}
