import { Realm } from '@realm/react';

export type ICoordsSchemaProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export class Coords extends Realm.Object<Coords> {
  latitude!: number;
  longitude!: number;
  timestamp!: number;

  static generate({ longitude, latitude, timestamp }: ICoordsSchemaProps) {
    return { longitude, latitude, timestamp };
  }

  static schema = {
    name: 'Coords',
    embedded: true, // SINALIZA QUE ESSE SCHEMA VAI SER UTILIZADO DENTRO DE OUTRO SCHEMA
    properties: {
      longitude: 'float',
      latitude: 'float',
      timestamp: 'float',
    },
  };
}
