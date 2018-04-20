import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

class MarkerItem extends Component {
  render() {
    const { address } = this.props.item;

    return (
      <Text>{address}</Text>
    );
  }
}

const styles = StyleSheet.create({

});

export { MarkerItem };