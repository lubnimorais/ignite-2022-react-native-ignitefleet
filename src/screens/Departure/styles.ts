import { styled } from '../../theme/stitches.config';

export const DepartureContainer = styled('View', {
  flex: 1,

  backgroundColor: '$GRAY_800',
});

export const DepartureContent = styled('View', {
  flex: 1,

  gap: 16,

  padding: 32,

  marginTop: 16,
});

export const Message = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$MD',
  color: '$WHITE',
  textAlign: 'center',

  margin: 24,
});
