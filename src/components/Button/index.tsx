import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface IButtonProps extends RectButtonProperties {
  title: string;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({ title, loading, ...rest }) => (
  <Container {...rest}>
    {loading ? (
      <ActivityIndicator animating={loading} size="large" color="#FFF" />
    ) : (
      <ButtonText>{title}</ButtonText>
    )}
  </Container>
);

export default Button;
