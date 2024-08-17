module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv',
        {
          // NOME QUE VAI UTILIZAR PARA IMPORTAR AS VARIÁVEIS DE AMBIENTE
          moduleName: '@env',
          // SE VAI PERMITIR OU NÃO VARIÁVEIS DE AMBIENTE UNDEFINED
          allowUndefined: false
        }
      ]
    ]
  };
};
