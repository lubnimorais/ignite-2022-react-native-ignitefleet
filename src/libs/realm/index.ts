import { Realm, createRealmContext } from '@realm/react';

import { Historic } from './schemas/Historic';
import { Coords } from './schemas/Coords';

/**
 * ESSE COMPORTAMENTO SIGNIFICA QUE PARA NOVOS
 * ARQUIVOS DO REALM DE SINCRONIZAÇÃO TEMOS:
 *
 * DownloadBeforeOpen: VAI ABRIR O BANCO DE DADOS
 * DEPOIS QUE TERMINAR O DOWNLOAD
 *
 * OpenImmediately: ABRE IMEDIATAMENTO O BANCO DE DADOS
 */
const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
};

// HABILITANDO SINCRONIZAÇÃO NO APP
export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
};

export const {
  RealmProvider, // O PRÓPRIO PROVIDER PARA COMPARTILHAR O ACESSO AO BANCO
  useRealm, // USAR A INSTÂNCIA DO BANCO DE DADOS, UTILIZADO PARA CADASTRAR, ATUALIZAR...
  useQuery, // IMPLEMENTAR CONSULTAS NO BANCO
  useObject, // OBTER UM OBJETO ESPECÍFICO
} = createRealmContext({
  schema: [Historic, Coords],
  schemaVersion: 1,
});
