import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../constants/colors';

interface AppTextInputProps extends TextInputProps {
  placeholder?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor={colors.grey} {...props} />;
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.white,
  },
});
