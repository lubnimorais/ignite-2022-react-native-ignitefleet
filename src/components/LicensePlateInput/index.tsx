import { forwardRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { useTheme } from '../../theme/stitches.config';

import { LicensePlateInputContainer, Label, Input } from './styles';

type ILicensePlateInput = TextInputProps & {
  label: string;
};

export const LicensePlateInput = forwardRef<TextInput, ILicensePlateInput>(
  ({ label, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <LicensePlateInputContainer>
        <Label>{label}</Label>

        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={theme.colors.GRAY_400}
          {...rest}
        />
      </LicensePlateInputContainer>
    );
  },
);
