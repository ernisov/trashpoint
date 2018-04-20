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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Spinner, Button } from './common';
import { Marker } from './map/index';
import Picture from './common/Picture';

import {
  getImage,
  camera,
  positionAcquired,
  amountChanged,
  sendMarker,
} from '../actions';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
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
    this.props.camera();
    this.props.getImage();
  }

  onSubmit() {
    const {
      authorID,
      address,
      amount,
      latlng,
      imageURI,
      status
    } = this.props;

    const props = {
      authorID,
      address,
      amount,
      latlng,
      imageURI,
      status
    };
    this.props.sendMarker(props);
  }

  renderMap() {
    const marker = {
      coords : {
        latitude: this.props.latlng.latitude,
        longitude: this.props.latlng.longitude,
      },
      status: this.props.status,
    };

    return (
      <MapView
        style={styles.map}
        region={this.props.latlng}
        scrollEnabled={false}
        rotateEnabled={false}
      >
        <Marker
          marker={marker}
          disabled
        />
      </MapView>
    );
  }

  renderIcon() {
    switch (this.props.amount) {
      case 1:
        return <Image style={styles.icon} source={require('../../assets/icons/0.png')} />;
      case 2:
        return <Image style={styles.icon} source={require('../../assets/icons/25.png')} />;
      case 3:
        return <Image style={styles.icon} source={require('../../assets/icons/75.png')} />;
      default:
        return <Image style={styles.icon} source={require('../../assets/icons/100.png')} />;
    }
  }

  renderImages() {
    return this.props.imageURI.map(value => {
      return (
        <Picture
          key={value}
          style={styles.image}
          source={{ uri: value }}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderMap()}
        <View style={styles.wrapper}>
          <View style={styles.section}>
            <Text style={styles.h2}>{this.props.address}</Text>
            <Text style={styles.smallText}>{this.props.latlng.latitude + ' | ' + this.props.latlng.longitude}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h2}>Количество мусора</Text>
            <View style={styles.row}>
              {this.renderIcon()}
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
              <TouchableOpacity style={styles.addPhoto} onPress={this.onButtonPress.bind(this)}>
                {this.props.loading ? <Spinner /> : <Icon name='plus' size={60} color='#ddd' />}
              </TouchableOpacity>
              {this.renderImages()}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Button
              onPress={this.onSubmit.bind(this)}
              disabled={this.props.loading}
              text='Отправить'
              style={styles.submit}
            />
          </View>
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
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    alignSelf: 'stretch',
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
    marginHorizontal: 5,
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  addPhoto: {
    marginRight: 5,
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    width: SCREEN_WIDTH * 0.75,
    borderRadius: 5,
  },
  icon: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  wrapper: {
    paddingHorizontal: 15,
  }
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
  sendMarker,
})(AddMarker);
