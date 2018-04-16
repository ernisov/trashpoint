import React from 'react';
import { View, StyleSheet } from 'react-native';

const Section = (props) => (
  <View style={[styles.section, props.style]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
});

export { Section };
