import { TextInput, TextInputProps } from "react-native";

import { InputArea, Label, TextAreaInputContainer } from "./styles";
import { useTheme } from "../../theme/stitches.config";
import { forwardRef, RefObject } from "react";

type ITextAreaInput = TextInputProps & {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, ITextAreaInput> ((
  { label, ...rest }, ref
) => {
  const theme = useTheme()

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
  )
})

export { TextAreaInput }