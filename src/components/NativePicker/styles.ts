import styled from 'styled-components/native';
import { Picker } from 'react-native';

export const Container = styled.View`
  height: 60px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 16px;
`;

export const RNPicker = styled(Picker)`
  flex: 1;
`;
