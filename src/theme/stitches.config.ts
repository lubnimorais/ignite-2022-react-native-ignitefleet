import { createStitches } from "stitches-native";

import THEME from './index'

export const { config, styled, css, useTheme, theme, createTheme, ThemeProvider } = createStitches({
  theme: {
    fonts: THEME.FONT_FAMILY,
    fontSizes: THEME.FONT_SIZE,
    colors: THEME.COLORS
  }
});