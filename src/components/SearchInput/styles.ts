import styled from 'styled-components/native';

import SearchableDropdown from 'react-native-searchable-dropdown';

export const Input = styled(SearchableDropdown).attrs({
  containerStyle: {},
  itemStyle: {
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemTextStyle: { color: '#444' },
  itemsContainerStyle: { maxHeight: 130 },
})``;

export const TextError = styled.Text`
  position: absolute;
  right: 0;
  top: 25px;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: #c53030;
`;
