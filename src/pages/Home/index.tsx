import React, { useCallback, useState, useEffect, useRef } from 'react';

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import axios from 'axios';
import NativePicker from '../../components/NativePicker';

import Button from '../../components/ButtonWithIconField';
import SearchInput from '../../components/SearchInput';

import logoImg from '../../assets/logo.png';
import backgroundImg from '../../assets/home-background.png';

import { Container, Main, Title, Description } from './styles';

interface IIBGEStateResponse {
  sigla: string;
  nome: string;
}

interface IIBGECityResponse {
  nome: string;
}

interface IState {
  uf: string;
  name: string;
}

interface ICity {
  name: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const cityInputRef = useRef<any>(null);

  const [states, setStates] = useState<IState[]>();
  const [cities, setCities] = useState<ICity[]>();
  const [selectedState, setSelectedState] = useState<IState>();

  useEffect(() => {
    async function loadStates() {
      const response = await axios.get<IIBGEStateResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      );

      const stateDetails = response.data.map((state) => ({
        uf: state.sigla,
        name: state.nome,
      }));

      setStates(stateDetails);
    }

    loadStates();
  }, []);

  useEffect(() => {
    async function loadCities() {
      const response = await axios.get<IIBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState?.uf}/municipios?orderBy=nome`,
      );

      const citiesNames = response.data.map((city) => ({ name: city.nome }));

      setCities(citiesNames);
    }

    if (selectedState) {
      loadCities();
    }
  }, [selectedState]);

  const handleSelectState = useCallback((data) => {
    cityInputRef.current.clearValue();
    cityInputRef.current.focus();
    setSelectedState(data);
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      navigation.navigate('Points', {
        city: data.city,
        state: selectedState,
      });
    },
    [navigation, selectedState],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container source={backgroundImg}>
          <Main>
            <Image source={logoImg} />
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Description>
          </Main>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <SearchInput
              name="uf"
              placeholder="Selecione um estado"
              options={states || []}
              setSelectedItem={handleSelectState}
              returnKeyType="next"
              onSubmitEditing={() => {
                cityInputRef.current?.focus();
              }}
            />

            <SearchInput
              name="city"
              ref={cityInputRef}
              placeholder="Selecione uma cidade"
              options={cities || []}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              title="Encontrar um ponto de coleta"
              icon="arrow-right"
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
