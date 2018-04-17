import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Picker,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import SvgUri from 'react-native-svg-uri';
import { connect } from 'react-redux';
import { Marker } from './map/index';

import {
  getImage,
  camera,
  positionAcquired,
  amountChanged,
} from '../actions';

import {
  SCREEN_HEIGHT,
} from '../variables';

class AddMarker extends Component {
  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
    };

    navigator.geolocation.getCurrentPosition((position) => {
      this.props.positionAcquired(position);
    }, (err) => console.log(err), options);
  }

  onButtonPress() {

    this.props.getImage();
  }

  renderMap() {
    return (
      <MapView
        style={styles.map}
        region={this.props.latlng}
        scrollEnabled={false}
        rotateEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: this.props.latlng.latitude,
            longitude: this.props.latlng.longitude,
          }}
          status={this.props.status}
          disabled
        />
      </MapView>
    );
  }

  renderIcon() {
    switch (this.props.amount) {
      case 1:
        return require('../../assets/icons/0.svg');
      case 2:
        return require('../../assets/icons/25.svg');
      case 3:
        return require('../../assets/icons/75.svg');
      default:
        return require('../../assets/icons/100.svg');
    }
  }

  renderImages() {
    return this.props.imageURI.map(value => {
      return <Image key={value} style={styles.image} source={{ uri: value }} />;
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderMap()}
        <View style={styles.section}>
          <Text style={styles.h2}>{this.props.address}</Text>
          <Text style={styles.smallText}>{this.props.latlng.latitude + ' | ' + this.props.latlng.longitude}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.h2}>Количество мусора</Text>
          <View style={styles.row}>
            <SvgUri
              width='75'
              height='75'
              source={this.renderIcon()}
            />
            <Picker
              selectedValue={this.props.amount}
              style={styles.picker}
              onValueChange={value => this.props.amountChanged(value)}
              mode='dropdown'
            >
              <Picker.Item label='небольшая куча' value={1} />
              <Picker.Item label='мешок' value={2} />
              <Picker.Item label='воз' value={3} />
              <Picker.Item label='грузовик' value={4} />
            </Picker>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.h2}>Фотографии</Text>
          <ScrollView horizontal contentContainerStyle={styles.images}>
            {this.renderImages()}
          </ScrollView>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
            <Text>add photo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

console.disableYellowBox = true;

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT / 3,
  },
  container: {
    backgroundColor: '#fff',
  },
  smallText: {
    color: '#bbb',
    fontSize: 14,
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    padding: 5,
  },
  h2: {
    fontSize: 18,
    color: '#2d2d2d',
    fontWeight: '500',
    marginBottom: 5,
  },
  images: {
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  image: {
    marginHorizontal: 10,
    height: 150,
    width: 150,
  },
});

const mapStateToProps = (state) => {
  const authorID = state.auth.user.uid;
  const {
    imageURI,
    loading,
    address,
    latlng,
    status,
    amount,
  } = state.marker;

  return {
    authorID,
    imageURI,
    loading,
    address,
    latlng,
    status,
    amount,
  };
};

export default connect(mapStateToProps, {
  getImage,
  camera,
  positionAcquired,
  amountChanged,
})(AddMarker);