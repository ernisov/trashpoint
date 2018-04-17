import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Screen,
} from '../common';

const AboutApp = () => {
  return (
    <Screen>
      <View style={styles.main}>
        <Text style={styles.languageText}>
          Taza Jashoo v0.0.1
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
  }
});

export { AboutApp };