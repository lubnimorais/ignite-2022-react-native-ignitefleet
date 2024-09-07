import { useRef } from "react";

import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";

import { TextAreaInput } from "../../components/TextAreaInput";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";

import { DepartureContainer, DepartureContent } from "./styles";

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position' 

export function DepartureScreen() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('OK');
  }

  return (
    <DepartureContainer>
      <Header title="Saída" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior} >
        <ScrollView>
          <DepartureContent>
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              returnKeyType="next"
              onSubmitEditing={() => {
                descriptionRef.current?.focus()
              }}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              onSubmitEditing={() => {
                handleDepartureRegister()
              }}
              /**
               * por ser multine para que não quebre a linha caso toque
               * no botão send do teclado
               */
              blurOnSubmit
            />

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </DepartureContent>
        </ScrollView>
      </KeyboardAvoidingView>
    </DepartureContainer>
  )
}