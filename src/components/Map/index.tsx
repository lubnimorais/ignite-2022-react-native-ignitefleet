import { useCallback, useRef } from 'react';

import MapView, {
  MapViewProps,
  PROVIDER_GOOGLE,
  LatLng,
  Marker,
  Polyline,
} from 'react-native-maps';

import { Car, FlagCheckered } from 'phosphor-react-native';

import { useTheme } from '../../theme/stitches.config';

import { IconBox } from '../IconBox';

type IMapProps = MapViewProps & {
  /**
   * PASSAMOS COMO UM ARRAY, PORQUE O MAPA PODE RECEBER UMA COORDENADA
   * QUANDO QUISERMOS MOSTRAR UM PIN NO MAPA. MAS VAI TER MOMENTOS
   * QUE VAMOS QUERER EXIBIR MAIS DE UMA POSIÇÃO, MAIS DE UM PIN NO MAPA
   */
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: IMapProps) {
  const theme = useTheme();

  const mapRef = useRef<MapView>(null);

  /**
   * SE PASSARMOS SOMENTE UMA COORDENADA ENTÃO A ÚLTIMA COORDENADA
   * DO ARRAY VAI SER A PRIMEIRA, POIS SÓ TENHO UMA COORDENADA.
   *
   * SE TIVERMOS MAIS DE UMA COORDENADA ALÉM DA COORDENADA DO
   * LUGAR QUE SAIU, TEREMOS VÁRIAS POR ONDE PASSOU E PARA MOSTRAR
   * A COORDENADA DE CHEGADA, MOSTRAREMOS A ÚLTIMA COORDENADA
   */
  const lastCoordinate = coordinates[coordinates.length - 1];

  // FUNCTIONS

  // FUNÇÃO PARA REPOSICIONAR OS MARCADORES
  const onMapLoaded = useCallback(async () => {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        // ESPAÇAMENTO PARA OS MARCADORES NÃO FICAREM GRUDADOS NAS BORDAS
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [coordinates.length]);
  // END FUNCTIONS

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox icon={FlagCheckered} size="SMALL" />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            // COR DA LINHA
            strokeColor={theme.colors.GRAY_700}
            // ESPESSURA DA LINHA
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  );
}
