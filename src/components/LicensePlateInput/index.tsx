import { TextInputProps } from 'react-native';
import { useTheme } from '../../theme/stitches.config';

import { LicensePlateInputContainer, Label, Input } from './styles';

type ILicensePlateInput = TextInputProps & {
  label: string;
}

export function LicensePlateInput({ label, ...rest }: ILicensePlateInput) {
  const theme = useTheme();

  return (
    <LicensePlateInputContainer>
      <Label>{label}</Label>

      <Input 
        maxLength={7} 
        autoCapitalize="characters" 
        placeholderTextColor={theme.colors.GRAY_400} 
        {...rest}
      />
    </LicensePlateInputContainer>
  )
}