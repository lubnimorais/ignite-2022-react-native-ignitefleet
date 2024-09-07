import { styled } from "../../theme/stitches.config";

export const HeaderContainer = styled('View', {
  width: '100%',

  flexDirection: 'row',
  justifyContent: 'space-between',

  padding: '0 32px 24px',

  backgroundColor: '$GRAY_700',

  zIndex: 1
});

export const Title = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$XL',
  color: '$GRAY_100'
})