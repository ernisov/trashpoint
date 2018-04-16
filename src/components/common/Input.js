import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH } from '../../variables';

const Input = (props) => {
  const {
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    textStyle,
    style,
  } = props;

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.textStyle, textStyle]}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        placeholderTextColor='#727272'
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    fontSize: 16,
    paddingBottom: 5,
    borderBottomWidth: 0.4,
    borderColor: '#727272',
    textAlign: 'center',
    width: SCREEN_WIDTH * 0.77,
  },
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export { Input };
