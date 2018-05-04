import React, { Component } from 'react';
import {
  View,
  Text,
  Touchableopacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import { Spinner, Button } from './common';
import { Marker } from './map/index';
import { toYellow, toGreen } from '../actions';
import { Actions } from 'react-native-router-flux';
import Picture from './common/Picture';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  ASPECT_RATIO,
} from '../variables';

class MarkerDetails extends Component {
  onImagePress() {
    this.setState({ imageVisible: !this.state.imageVisible });
  }

  toYellow() {
    const info = {
      authorID: this.props.marker.authorID,
      markerID: this.props.marker.id,
      imageURI: this.props.marker.imageURI,
      address: this.props.marker.address,
    };
    this.props.toYellow(info);
    Actions.pop();
  }

  toGreen() {
    const info = {
      authorID: this.props.marker.authorID,
      markerID: this.props.marker.id,
      imageURI: this.props.marker.imageURI,
      address: this.props.marker.address,
    };
    this.props.toGreen(info);
    Actions.pop()
  }

  renderAmount() {
    switch (this.props.marker.amount) {
      case 1:
        return (
          <View style={styles.row}>
            <Image style={styles.icon} source={require('../../assets/icons/0.png')} />
            <Text style={styles.amount}>Небольшая куча</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.row}>
            <Image style={styles.icon} source={require('../../assets/icons/25.png')} />
            <Text style={styles.amount}>Мешок</Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.row}>
            <Image style={styles.icon} source={require('../../assets/icons/75.png')} />
            <Text style={styles.amount}>Воз</Text>
          </View>
        );
      default:
        return (
          <View style={styles.row}>
            <Image style={styles.icon} source={require('../../assets/icons/100.png')} />
            <Text style={styles.amount}>Грузовик</Text>
          </View>
        );
    }
  }

  renderMap() {
    const region = {
      latitude: this.props.marker.coords.latitude,
      longitude: this.props.marker.coords.longitude,
      latitudeDelta: 0.00222,
      longitudeDelta: 0.00222 * ASPECT_RATIO,
    };

    return (
      <MapView
        style={styles.map}
        region={region}
        scrollEnabled={false}
        rotateEnabled={false}
      >
        <Marker
          marker={this.props.marker}
          disabled
        />
      </MapView>
    );
  }

  renderImages() {
    return _.map(this.props.marker.imageURI, (value) => {
      return (
        <Picture
          key={value}
          style={styles.image}
          source={{ uri: value }}
        />
      );
    }).reverse();
  }

  renderButton() {
    if (this.props.marker.status === 'red') {
      return (
        <View style={styles.section}>
          <Button
            text='Начать уборку'
            onPress={this.toYellow.bind(this)}
            style={styles.button}
          />
        </View>
      );
    }
    if (this.props.marker.status === 'yellow') {
      return (
        <View style={styles.section}>
          <Button
            text='Закончить уборку'
            onPress={this.toGreen.bind(this)}
            style={styles.button}
          />
        </View>
      );
    }
  }

  render() {
    const {
      address,
      coords,
    } = this.props.marker;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderMap()}
        <View style={styles.wrapper}>
          <View style={styles.section}>
            <Text style={styles.h2}>{address}</Text>
            <Text style={styles.smallText}>{coords.latitude + ' | ' + coords.longitude}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h2}>Количество Мусора</Text>
            {this.renderAmount()}
          </View>
          <View style={styles.section}>
            <Text style={styles.h2}>Фотографии</Text>
            <ScrollView horizontal contentContainerStyle={styles.images}>
              {this.renderImages()}
            </ScrollView>
          </View>
            {this.renderButton()}
        </View>
      </ScrollView>
    );
  }
}

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
  h2: {
    fontSize: 18,
    color: '#2d2d2d',
    fontWeight: '500',
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    marginLeft: 20,
    color: '#3d3d3d',
  },
  icon: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  image: {
    marginHorizontal: 5,
    borderRadius: 5,
    height: 150,
    width: 150,
  },
  button: {
    width: SCREEN_WIDTH * 0.75,
    borderRadius: 5,
  },
  wrapper: {
    paddingHorizontal: 15,
  }
});

export default connect(null, { toYellow, toGreen })(MarkerDetails);
