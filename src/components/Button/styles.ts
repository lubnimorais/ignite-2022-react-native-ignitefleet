import { styled } from "../../theme/stitches.config";

import { ActivityIndicator, TouchableOpacity } from "react-native";

export const ButtonContainer = styled(TouchableOpacity, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',

  /**
   * HACK PARA TRAVAR O BOTÃO CRESCER NA VERTICAL
   * E SÓ CRESCER NA HORIZONTAL COM O FLEX, DANDO
   * ASSIM MAIOR FLEXIBILIDADE PARA UTILIZAR O BOTÃO
   * EM LUGARES COM LARGURAS DIFERENTES
   */
  minHeight: 56,
  maxHeight: 56,

  backgroundColor: '$BRAND_MID',
});

export const ButtonTitle = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$MD',
  color: '$WHITE',
})

export const ButtonLoading = styled(ActivityIndicator, {})
.attrs(({ theme }) => ({
  color: theme.colors.WHITE
}))