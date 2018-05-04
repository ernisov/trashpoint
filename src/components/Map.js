import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import { positionChanged, getMarkers, mapSwitch } from '../actions';

import {
  Marker,
  ListItem
} from './map';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../variables';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
    };

    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.props.positionChanged(position);
    }, (err) => console.log(err), options);

    this.props.getMarkers();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  renderMarkers() {
    return this.props.markers.map((marker) => {
      return (
        <Marker
          key={`${marker.id}${Date.now()}`}
          coordinate={marker.coords}
          marker={marker}
        />
      );
    });
  }

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  onClusterPress(coords, markers) {
    const print = (markers) => {
      return markers.forEach((x) => {
        return (
          <Text>{x.item.props.marker.address}</Text>
        );
      });
    };

    this.setState({ modalVisible: !this.state.modalVisible });
  }

  renderModal() {
    return (
      <Modal
        animationType='slide'
        visible={this.state.modalVisible}
        transparent
      >
          <ScrollView contentContainerStyle={styles.modalWindow}>
            <View>
              <Text>Modal</Text>
              <TouchableWithoutFeedback
                onPress={(() => this.setState({ modalVisible: !this.state.modalVisible })).bind(this)}
              >
                <Text>close</Text>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
      </Modal>
    );
  }

  renderScreen() {
    if (!this.props.isList) {
      return (
        <MapView
          style={styles.mapView}
          region={this.props.position}
          clusterColor='#2ad2ac'
          clusterTextColor='#ffffff'
          clusterBorderWidth={0}
          onClusterPress={this.onClusterPress.bind(this)}
          showsMyLocationButton
          showsUserLocation
          zoomControlEnabled
        >
          {this.renderMarkers()}
        </MapView>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.markers}
          renderItem={({ item }) => (
            <ListItem item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }

  onActionButtonPressed() {
    this.props.mapSwitch();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScreen()}
        {this.renderModal()}
      </View>
    );
  }
}

const renderIcon = (active) => {
  if (active) {
    return (<Icon name='map' style={styles.actionButton} size={24} />);
  }
  return (<Icon name='list' style={styles.actionButton} size={24}/>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapView: {
    flex: 1,
  },
  actionButton: {
    color: '#FFF',
  },
  modalWindow: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SCREEN_HEIGHT * 0.1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 2,
  }
});

const mapStateToProps = (state) => {
  const { position, isList } = state.map;

  return {
    position: position,
    markers: [...state.map.markers],
    isList: isList,
  };
};

export default connect(mapStateToProps, { positionChanged, getMarkers, mapSwitch })(Map);
