import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, LinkText } from './styles';

const Link: React.FC<TouchableOpacityProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <LinkText>{children}</LinkText>
  </Container>
);

export default Link;
