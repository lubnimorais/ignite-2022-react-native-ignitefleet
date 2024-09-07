import { styled } from "../../theme/stitches.config";

export const TextAreaInputContainer = styled('View', {
  width: '100%',
  height: 150,

  padding: 16,

  borderRadius: 6,

  backgroundColor: '$GRAY_700',
});

export const Label = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$SM',
  color: '$GRAY_300',
});

export const InputArea = styled('TextInput', {
  fontFamily: '$REGULAR',
  fontSize: '$MD',
  color: '$GRAY_200',

  marginTop: 16
}).attrs(() => ({
  verticalAlign: 'top'
}))