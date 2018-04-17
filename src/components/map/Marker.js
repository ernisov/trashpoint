import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Marker } from 'react-native-maps';
import { onMarkerPressed } from '../../actions';


class MarkerComponent extends Component {
  onMarkerPress() {
    const params = {
      id: this.props.markerId,
      coordinate: this.props.coordinate,
      status: this.props.status,
      address: this.props.address,
      amount: this.props.amount,
      imageURI: this.props.imageURI,
    };
    return this.props.onMarkerPressed.bind(this, params);
  }

  assignStatusStyles(status) {
    let markerStyle = null;

    switch (status) {
      case 'red':
        markerStyle = styles.redMarker;
        break;
      case 'yellow':
        markerStyle = styles.yellowMarker;
        break;
      default:
        markerStyle = styles.greenMarker;
    }

    return markerStyle;
  }


  render() {
    const { markerId, coordinate, status } = this.props;

    return (
        <Marker
          coordinate={coordinate}
          onPress={!this.props.disabled ? this.onMarkerPress() : null}
        >
          <View style={this.assignStatusStyles(status)}/>
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

export const CustomMarker = connect(null, { onMarkerPressed })(MarkerComponent);
