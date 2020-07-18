import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

import { Container, Title } from './styles';

interface IForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleInputFocus = useCallback(() => {
    formRef.current?.setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (data: IForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Formato de e-mail inválido')
            .required('E-mail requerido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await forgotPassword(data);

        Alert.alert(
          'E-mail de recuperação de senha enviado',
          'Verifique sua caixa de e-mail',
        );

        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } catch (err) {
        err.name === 'ValidationError'
          ? formRef.current?.setErrors(getValidationErrors(err))
          : Alert.alert(
              'Falha ao pedir recuperação de senha',
              'Verifique os dados, tente novamente',
            );
        setLoading(false);
      }
    },
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <View>
            <Title>React Native Project</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              icon="user"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onFocus={handleInputFocus}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              title="RECUPERAR"
              loading={loading}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>

          <Link
            onPress={() => {
              navigation.reset({
                routes: [
                  {
                    name: 'SignIn',
                  },
                ],
                index: 0,
              });
            }}
          >
            Voltar para o login
          </Link>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
