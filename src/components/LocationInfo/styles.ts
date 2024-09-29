import { styled } from '../../theme/stitches.config';

export const LocationInfoContainer = styled('View', {
  width: '100%',

  flexDirection: 'row',
  alignItems: 'center',
});

export const Info = styled('View', {
  flex: 1,
});

export const Label = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_300',
});

export const Description = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_100',
});
