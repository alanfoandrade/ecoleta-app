import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonIcon, ButtonText } from './styles';

interface IButtonWithIconField extends RectButtonProperties {
  title: string;
  icon: string;
}

const ButtonWithIconField: React.FC<IButtonWithIconField> = ({
  title,
  icon,
  ...rest
}) => (
  <Container {...rest}>
    <ButtonIcon>
      <Icon name={icon} size={24} color="#FFF" />
    </ButtonIcon>
    <ButtonText>{title}</ButtonText>
  </Container>
);

export default ButtonWithIconField;
