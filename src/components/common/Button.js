import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Button = (props) => {
  let buttonStyles = styles.button;
  if (props.disabled) buttonStyles = styles.buttonDisabled;

  return (
    <TouchableOpacity
      style={[buttonStyles, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#2AD2AC',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#00C79B60',
  },
});

export { Button };
