import { styled } from '../../theme/stitches.config';

export const HomeContainer = styled('View', {
  flex: 1,

  backgroundColor: '$GRAY_800',
});

export const HomeContent = styled('View', {
  flex: 1,

  // padding: '0, 32px',
  paddingHorizontal: 32,
});

export const Title = styled('Text', {
  fontFamily: '$BOlD',
  fontSize: '$MD',
  color: '$WHITE',

  marginBottom: 12,
});

export const Label = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_400',
  textAlign: 'center',

  marginTop: 32,
});
