import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, ButtonLoading, ButtonTitle } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: IButtonProps) {
  return (
    <ButtonContainer disabled={isLoading} activeOpacity={0.7} {...rest}>
      {isLoading ? <ButtonLoading /> : <ButtonTitle>{title}</ButtonTitle>}
    </ButtonContainer>
  )
}