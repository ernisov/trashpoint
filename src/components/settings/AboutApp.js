import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Screen,
} from '../common';

const AboutApp = () => {
  return (
    <Screen>
      <View style={styles.main}>
        <Text>Taza Jashoo v0.0.1</Text>
        <Text>Все права защищены</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center'
  }
});

export { AboutApp };