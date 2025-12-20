import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TextInput, TextInputProps } from './TextInput';
import { colors } from '@/design/colors';

export interface SearchInputProps extends Omit<TextInputProps, 'leftIcon'> {
  onClear?: () => void;
}

function SearchIcon() {
  return <Text style={{ fontSize: 16, color: colors.text.tertiary }}>🔍</Text>;
}

function ClearIcon({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ fontSize: 16, color: colors.text.tertiary }}>✕</Text>
    </TouchableOpacity>
  );
}

export function SearchInput({ onClear, ...props }: SearchInputProps) {
  return (
    <TextInput
      placeholder="Search..."
      leftIcon={<SearchIcon />}
      rightIcon={props.value && onClear ? <ClearIcon onPress={onClear} /> : null}
      {...props}
    />
  );
}
