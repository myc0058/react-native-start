import React from 'react';
import { TextInput, TextInputProps } from './TextInput';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/design/colors';

export interface SearchInputProps extends Omit<TextInputProps, 'leftIcon'> {
  onClear?: () => void;
}

export function SearchInput({ onClear, ...props }: SearchInputProps) {
  return (
    <TextInput
      placeholder="Search..."
      leftIcon={<Ionicons name="search" size={20} color={colors.text.tertiary} />}
      rightIcon={
        props.value && onClear ? (
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.text.tertiary}
            onPress={onClear}
          />
        ) : null
      }
      {...props}
    />
  );
}
