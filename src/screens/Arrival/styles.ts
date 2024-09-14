import { styled } from '../../theme/stitches.config';

export const ArrivalContainer = styled('View', {
  flex: 1,

  backgroundColor: '$GRAY_800',
});

export const ArrivalContent = styled('View', {
  flexGrow: 1,

  padding: 32,
});

export const Label = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_300',

  marginTop: 32,
  marginBottom: 5,
});

export const LicensePlate = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$XXXL',
  color: '$GRAY_100',
});

export const Description = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$MD',
  color: '$GRAY_100',

  textAlign: 'justify',
});

export const Footer = styled('View', {
  width: '100%',

  flexDirection: 'row',

  marginTop: 32,
  marginHorizontal: 16,
});
