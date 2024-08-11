import { styled } from "../../theme/stitches.config";

export const SignInContainer = styled('ImageBackground', {
  flex: 1,
  justifyContent: 'center',

  backgroundColor: '$GRAY_800',

  padding: 52
});

export const SignInTitle = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$XXXL',
  color: '$BRAND_LIGHT',
  textAlign: 'center'
});

export const SignInSlogan = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$MD',
  color: '$GRAY_100',
  textAlign: 'center',

  marginBottom: 32
});