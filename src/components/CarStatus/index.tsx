import { TouchableOpacityProps } from "react-native";

import { Key, Car } from "phosphor-react-native";

import { useTheme } from "../../theme/stitches.config";

import { CarStatusContainer, IconBox, Message, TextHighlight } from "./styles";

type ICarStatusProps = TouchableOpacityProps & {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: ICarStatusProps) {
  const theme = useTheme()

  const Icon = licensePlate ? Key : Car;
  const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : `Nenhum veículo em uso. `;
  const status = licensePlate ? 'chegada' : 'saída';

  return (
    <CarStatusContainer {...rest}>
      <IconBox>
        <Icon
          size={32}
          color={theme.colors.BRAND_LIGHT}
        />
      </IconBox>

      <Message>
        {message}

        <TextHighlight>
          Clique para registar a {status}
        </TextHighlight>
      </Message>
    </CarStatusContainer>
  )
}