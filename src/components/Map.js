import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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

class Map extends Component {
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

  renderScreen() {
    if (!this.props.isList) {
      return (
        <MapView
          style={styles.mapView}
          region={this.props.position}
          clusterColor='#2ad2ac'
          clusterTextColor='#ffffff'
          clusterBorderWidth={0}
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

        <ActionButton
          buttonColor='#2AD2AC'
          renderIcon={() => renderIcon(this.props.isList)}
          onPress={() => this.onActionButtonPressed()}
          useNativeFeedback={false}
        />
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
