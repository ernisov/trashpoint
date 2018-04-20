import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Marker } from 'react-native-maps';

class CustomMarker extends Component {
  onMarkerPress() {
    const marker = this.props.marker;
    Actions.MarkerDetails({ marker });
  }

  render() {
    const { coords, status } = this.props.marker;
    const renderCircle = (status) => {
      console.log('status: ', status);
      switch (status) {
        case 'red':
          return <View style={styles.redMarker} />;
        case 'yellow':
          return <View style={styles.yellowMarker} />;
        default:
          return <View style={styles.greenMarker} />;
      }
    };

    return (
        <Marker
          coordinate={coords}
          onPress={!this.props.disabled ? this.onMarkerPress.bind(this) : null}
        >
          {renderCircle(status)}
        </Marker>
    );
  }
};

const styles = StyleSheet.create({
  redMarker: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor:'#FF5352',
    overflow: 'hidden'
  },
  yellowMarker: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor:'#F9AA00',
    overflow: 'hidden'
  },
  greenMarker: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor:'#2AD2AC',
    overflow: 'hidden'
  },
});

export { CustomMarker };
