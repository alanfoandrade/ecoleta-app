import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Constants } from 'react-native-unimodules';

export const Container = styled.View`
  flex: 1;
  padding: ${20 + Constants.statusBarHeight}px 24px 24px;
`;

export const PointImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-top: 16px;
`;

export const PointName = styled.Text`
  color: #322153;
  font-size: 28px;
  font-family: 'Ubuntu-Bold';
  margin-top: 24px;
`;

export const PointItems = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Address = styled.View`
  margin-top: 32px;
`;

export const AdressTitle = styled.Text`
  color: #322153;
  font-family: 'Roboto-Medium';
  font-size: 16px;
`;

export const AdressContent = styled.Text`
  font-family: 'Roboto-Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Footer = styled.View`
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-color: #999;
  padding: 24px 24px 32px;
  flex-direction: row;
  justify-content: space-between;
`;
