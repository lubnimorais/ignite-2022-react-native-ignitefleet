import { styled } from '../../theme/stitches.config';

export const HistoricCardContainer = styled('TouchableOpacity', {
  width: '100%',

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  backgroundColor: '$GRAY_700',
  padding: '20px 16px',

  borderRadius: 6,

  marginBottom: 12,
});

export const Info = styled('View', {
  flex: 1,
});

export const LicensePlate = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$MD',
  color: '$WHITE',
});

export const Departure = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$XS',
  color: '$GRAY_200',

  marginTop: 4,
});
