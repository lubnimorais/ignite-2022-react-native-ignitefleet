import { createRealmContext} from '@realm/react';

import { Historic } from './schemas/Historic';

export const {
  RealmProvider, // O PRÓPRIO PROVIDER PARA COMPARTILHAR O ACESSO AO BANCO
  useRealm, // USAR A INSTÂNCIA DO BANCO DE DADOS, UTILIZADO PARA CADASTRAR, ATUALIZAR...
  useQuery, // IMPLEMENTAR CONSULTAS NO BANCO
  useObject // OBTER UM OBJETO ESPECÍFICO
} = createRealmContext({
  schema: [Historic]
}) 