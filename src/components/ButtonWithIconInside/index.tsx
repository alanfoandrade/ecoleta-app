import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, ButtonText } from './styles';

interface IButtonWithIconInside extends RectButtonProperties {
  title: string;
  icon: string;
}

const ButtonWithIconInside: React.FC<IButtonWithIconInside> = ({
  title,
  icon,
  ...rest
}) => (
  <Container {...rest}>
    <Icon name={icon} size={22} color="#FFF" />
    <ButtonText>{title}</ButtonText>
  </Container>
);

export default ButtonWithIconInside;
