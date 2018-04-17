import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Map extends Component {
  render() {
    return (
      <View>
        <Text>Map</Text>
      </View>
    );
  }
}

export default connect(null)(Map);