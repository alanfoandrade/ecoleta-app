import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #34cb79;
  width: 32%;
  height: 60px;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Roboto-Medium';
  font-size: 16px;
`;
