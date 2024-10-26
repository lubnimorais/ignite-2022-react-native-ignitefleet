import { ObjectSchema } from 'realm';

import { Realm } from '@realm/react';

import { ICoordsSchemaProps } from './Coords';

type IGenerateProps = {
  user_id: string;
  description: string;
  license_plate: string;
  coords: ICoordsSchemaProps[];
};

export class Historic extends Realm.Object<Historic> {
  // COLOCAMOS EXCLAMAÇÃO PARA DIZER QUE O CAMPO VAI SER UTILIZADO
  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  coords!: ICoordsSchemaProps[];
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    user_id,
    description,
    license_plate,
    coords,
  }: IGenerateProps) {
    return {
      _id: new Realm.BSON.UUID(), // gerar automaticamente
      user_id,
      description,
      license_plate,
      coords,
      status: 'departure',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema: ObjectSchema = {
    name: 'Historic',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        // campo que vai utilizado como filtro de pesquisa
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: 'Coords',
      },
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  };
}
