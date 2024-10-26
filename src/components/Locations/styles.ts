import { styled } from '../../theme/stitches.config';

export const LocationsContainer = styled('View', {
  width: '100%',
});

export const Line = styled('View', {
  width: 1,
  height: 64,

  margin: -2,
  marginLeft: 23,

  borderWidth: 1,
  borderLeftColor: '$GRAY_400',
});
