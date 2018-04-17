import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {
  Screen,
} from '../common';

const ProblemReport = () => {
  return (
    <Screen style={styles.main}>
      <Text style={styles.languageText}>
        Мы работаем над этой страницей
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  languageText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { ProblemReport };