import { forwardRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { useTheme } from '../../theme/stitches.config';

import { InputArea, Label, TextAreaInputContainer } from './styles';

type ITextAreaInput = TextInputProps & {
  label: string;
};

export const TextAreaInput = forwardRef<TextInput, ITextAreaInput>(
  ({ label, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <TextAreaInputContainer>
        <Label>{label}</Label>

        <InputArea
          ref={ref}
          placeholderTextColor={theme.colors.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </TextAreaInputContainer>
    );
  },
);
