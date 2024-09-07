import { styled } from "../../theme/stitches.config";

export const LicensePlateInputContainer = styled('View', {
  width: '100%',

  padding: 16,

  borderRadius: 6,

  backgroundColor: '$GRAY_700'
});

export const Label = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_300'
});

export const Input = styled('TextInput', {
  fontFamily: '$BOLD',
  fontSize: '$XXXL',
  color: '$GRAY_200',

  textAlign: 'center',

  marginTop: 16
});