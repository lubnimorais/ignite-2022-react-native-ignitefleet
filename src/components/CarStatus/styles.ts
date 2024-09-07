import { styled } from "../../theme/stitches.config";

export const CarStatusContainer = styled('TouchableOpacity', {
  width: '100%',

  flexDirection: 'row',
  alignItems: 'center',

  marginVertical: 32,
  // margin: '32, 0',

  padding: 22,

  borderRadius: 6,

  backgroundColor: '$GRAY_700'
});

export const IconBox = styled('View', {
  width: 77,
  height: 77,

  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '$GRAY_600',

  borderRadius: 6,

  marginRight: 12
});

export const Message = styled('Text', {
  flex: 1,

  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_100',

  textAlign: 'justify',
  /**
   * ALINHAR NA VERTICAL
   * ESSA PROPRIEDADE É DO REACT NATIVE, MAS COLOCAMOS ELA AQUI
   */
  textAlignVertical: 'center' 
});

export const TextHighlight = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$SM',
  color: '$BRAND_LIGHT'
});