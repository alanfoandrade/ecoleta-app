import React from 'react';
import { PickerProps } from 'react-native';

import { Container, RNPicker } from './styles';

interface IOption {
  uf?: string;
  name: string;
}

interface INativePickerProps extends PickerProps {
  placeholder: string;
  selectedValue?: IOption;
  options: IOption[];
  setSelectedItem(data: IOption): void;
}

const NativePicker: React.FC<INativePickerProps> = ({
  options,
  placeholder,
  selectedValue,
  setSelectedItem,
  style,
}) => {
  return (
    <Container style={style}>
      <RNPicker
        selectedValue={selectedValue}
        mode="dropdown"
        onValueChange={(data: IOption) => setSelectedItem(data)}
      >
        <RNPicker.Item color="#999" label={placeholder} value={undefined} />
        {options.map((opt) => (
          <RNPicker.Item
            key={opt.name}
            label={opt.uf || opt.name}
            value={opt}
          />
        ))}
      </RNPicker>
    </Container>
  );
};
export default NativePicker;
