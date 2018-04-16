import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const Screen = (props) => {
  if (props.scrollable) {
    return (
      <ScrollView contentContainerStyle={[styles.scrollView, props.style]}>
        {props.children}
      </ScrollView>
    );
  }
  return (
    <View style={[styles.view, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  view: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    flex: 1,
  },
});

export { Screen };
