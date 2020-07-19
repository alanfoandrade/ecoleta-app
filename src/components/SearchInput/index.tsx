import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';
import { Input, TextError } from './styles';

interface IOption {
  uf?: string;
  name: string;
}

export interface IInputProps extends TextInputProps {
  name: string;
  placeholder: string;
  options: IOption[];
  setSelectedItem?(data: string): void;
}

interface IInputValueRef {
  value: string;
}

interface IInputRef {
  focus(): void;
}

const SearchableInput: React.RefForwardingComponent<IInputRef, IInputProps> = (
  { name, options, placeholder, setSelectedItem },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<IInputValueRef>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },

    clearValue() {
      inputValueRef.current.value = '';
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleSelect = useCallback(
    (data) => {
      setSelectedItem && setSelectedItem(data);
      inputValueRef.current.value = data.name;
    },
    [setSelectedItem],
  );

  return (
    <>
      <Input
        onItemSelect={(data: IOption) => handleSelect(data)}
        items={options}
        resetValue={false}
        textInputProps={{
          ref: inputElementRef,
          placeholder,
          underlineColorAndroid: 'transparent',
          defaultValue: inputValueRef.current.value,
          style: {
            fontSize: 16,
            color: '#444',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#FFF',
            marginBottom: 8,
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
          showsVerticalScrollIndicator: false,
        }}
      />
      <TextError>{error}</TextError>
    </>
  );
};

export default forwardRef(SearchableInput);
