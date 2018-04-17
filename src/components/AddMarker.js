import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  getImage,
  camera,
  positionAcquired,
} from '../actions';

class AddMarker extends Component {
  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
    };

    navigator.geolocation.getCurrentPosition((position) => {
      this.props.positionAcquired();
    }, (err) => console.log(err), options);
  }

  onButtonPress() {
    this.props.camera();
    this.props.getImage();
  }

  render() {
    if ( this.props.loading ) {
      return (
          <View>
              <Text>Loading</Text>
          </View>
      );
    }
    return (
      <View>
        <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
          <Text>AddMarker</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { imageURI, loading } = state.marker;

  console.log(imageURI);
  return { user, imageURI, loading };
};

export default connect(mapStateToProps, {
  getImage,
  camera,
  positionAcquired,
})(AddMarker);