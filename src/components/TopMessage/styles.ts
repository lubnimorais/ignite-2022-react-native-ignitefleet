import { styled } from '../../theme/stitches.config';

import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export const TopMessageContainer = styled('View', {
  width: dimensions.width,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',

  zIndex: 1,

  backgroundColor: '$GRAY_500',

  paddingBottom: 5,
});

export const TopMessageTitle = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_100',

  marginLeft: 4,
});
