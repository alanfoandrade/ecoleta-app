import React, { useCallback, useRef } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

import { Container, Title, LinksContainer } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleInputFocus = useCallback(() => {
    formRef.current?.setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Formato de e-mail inválido')
            .required('E-mail requerido'),
          password: Yup.string().required('Senha requerida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        err.name === 'ValidationError'
          ? formRef.current?.setErrors(getValidationErrors(err))
          : Alert.alert(
              'Falha no login',
              'Verifique os dados, tente novamente',
            );
      }
    },
    [signIn],
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
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              title="ENTRAR"
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>

          <LinksContainer>
            <Link
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            >
              Recuperar senha
            </Link>

            <Link
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              Criar conta
            </Link>
          </LinksContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
