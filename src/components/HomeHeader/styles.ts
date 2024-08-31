import { styled } from "../../theme/stitches.config";

import { Image } from "expo-image";

export const HomeHeaderContainer = styled('View', {
  width: '100%',

  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: '$GRAY_700',

  padding: 32,
});

export const Greeting = styled('View', {
  flex: 1,

  marginLeft: 12
});

export const Message = styled('Text', {
  fontFamily: '$REGULAR',
  fontSize: '$MD',
  color: '$GRAY_100'
})

export const Name = styled('Text', {
  fontFamily: '$BOLD',
  fontSize: '$LG',
  color: '$GRAY_100'
});

export const Picture = styled(Image, {
  width: 54,
  height: 54,

  borderRadius: 7
})