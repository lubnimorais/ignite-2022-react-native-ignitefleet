import { styled } from "../../theme/stitches.config";

import { ActivityIndicator } from "react-native";

export const LoadingContainer = styled('View', {
  flex: 1,
  alignItems:'center',
  justifyContent: 'center',

  backgroundColor: '$GRAY_800'
});

export const LoadingIndicator = styled(ActivityIndicator, {})
.attrs(({ theme }) => ({
  color: theme.colors.BRAND_LIGHT
}))