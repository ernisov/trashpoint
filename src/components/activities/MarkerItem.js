import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {Section} from "../common";
import { Actions } from 'react-native-router-flux';
import { GREEN, YELLOW, RED } from '../../variables';

class MarkerItem extends Component {
  printText(s) {
    switch (s) {
      case 'toYellow':
        return 'начал уборку';
      case 'toGreen':
        return 'закончил уборку';
      default:
        return 'создал';
    }
  }

  render() {
    const { address, timestamp, type, imageURI } = this.props.item;
    const time = new Date(timestamp);

    const statusIndicator = (status) => {
      switch (status) {
        case 'toGreen':
          return styles.greenIndicator;
        case 'toYellow':
          return styles.yellowIndicator;
        default:
          return styles.redIndicator;
      }
    };

    return (
      <TouchableHighlight underlayColor='#f7f7f7'>
        <View style={styles.container}>
          <View style={styles.imageBlock}>
            <Image
              style={styles.image}
              source={{ uri: imageURI[0] }}
            />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.headerText}>{address}</Text>
            <Text style={styles.timeText}>{'' + time}</Text>
            <View style={styles.statusAndAmount}>
              <View style={statusIndicator(type)} />
              <Text style={styles.text}>{this.printText(type)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  markerItem: {
    marginHorizontal: 10,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#252525',
  },
  timeText: {
    fontSize: 14,
    color: '#515151',
    fontStyle: 'italic'
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  imageBlock: {
    width: 75,
    height: 75,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 4,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    marginBottom: 2,
    color: '#2D2D2D',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  text: {
    color: '#999',
    fontSize: 14,
  },
  statusAndAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redIndicator: {
    width: 11,
    height: 11,
    backgroundColor: RED,
    borderRadius: 11 / 2,
    marginRight: 8,
  },
  greenIndicator: {
    width: 11,
    height: 11,
    backgroundColor: GREEN,
    borderRadius: 11 / 2,
    marginRight: 8,
  },
  yellowIndicator: {
    width: 11,
    height: 11,
    backgroundColor: YELLOW,
    borderRadius: 11 / 2,
    marginRight: 8,
  },
});

export { MarkerItem };