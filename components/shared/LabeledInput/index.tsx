import { View, Text, TextInput, StyleSheet, TextInputProps, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';

interface Props extends TextInputProps {
  label: string
}
export default function LabeledInput({ label, ...props }: Props) {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={Colors.grayX2}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={(e) => {
          setIsFocused(true)
          props.onFocus && props.onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          props.onBlur && props.onBlur(e)
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    backgroundColor: Colors.whitePrimary,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 20 : 10,
    borderRadius: 4,
    borderColor: Colors.grayX2,
    borderWidth: 1,
    fontSize: 14,
  },
  inputFocused: {
    borderColor: Colors.bluePrimary, // Change this to the desired focus color
    shadowColor: Colors.grayPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  inputLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
  }
});
