import styled from 'styled-components/native';
import { Constants } from 'react-native-unimodules';
import { StyleSheet, TouchableOpacityProps } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

interface IItemProps extends TouchableOpacityProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${20 + Constants.statusBarHeight}px 24px 0;
  background: #f0f0f5;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Ubuntu-Bold';
  margin-top: 8px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Roboto-Regular';
`;

export const Notice = styled.Text`
  color: #6c6c80;
  font-size: 12px;
  margin-top: 4px;
  font-family: 'Roboto-Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 8px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 70px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 64px;
  background: #34cb79;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerImage = styled.Image`
  width: 90px;
  height: 45px;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto-Medium';
  color: #fff;
  font-size: 13px;
`;

export const Arrow = styled.View`
  position: absolute;
  bottom: 0;
  left: 37px;
  width: 0;
  height: 0;
  border-top-width: 8px;
  border-top-color: #34cb79;
  border-right-width: 5px;
  border-right-color: transparent;
  border-left-width: 5px;
  border-left-color: transparent;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 32px;
  background: #f0f0f5;
`;

export const Item = styled.TouchableOpacity<IItemProps>`
  background: #fff;
  border-width: 2px;
  border-color: ${(props) => (props.isSelected ? '#34cb79' : '#eee')};
  height: 110px;
  width: 110px;
  border-radius: 8px;
  padding: 20px 16px 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;

  text-align: center;
`;

export const ItemTitle = styled.Text`
  font-family: 'Roboto-Regular';
  text-align: center;
  font-size: 13px;
`;
