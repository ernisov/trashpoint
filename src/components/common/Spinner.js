import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size }) => (
  <View style={styles.spinner}>
      <ActivityIndicator color='#2ad2ac' size={size || 'large'} />
  </View>
);

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Spinner };
