import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { onMarkerPressed } from '../../actions';
import { GREEN, YELLOW, RED } from '../../variables';

class ListItem extends Component {
  onItemPressed() {
    const params = {
      id: this.props.item.id,
      coordinate: this.props.item.latlng,
      status: this.props.item.status,
      address: this.props.item.address,
      amount: this.props.item.amount,
      imageURI: this.props.item.imageURI,
    };
    return this.props.onMarkerPressed.bind(this, params);
  }

  printText(status) {
    switch (status) {
      case 'red':
        return 'не убрано';
      case 'yellow':
        return 'в процессе';
      default:
        return 'убрано';
    }
  }

  render() {
    const { status, imageURI, address } = this.props.item;
    const statusIndicator = (s) => {
      switch (s) {
        case 'red':
          return styles.redIndicator;
        case 'yellow':
          return styles.yellowIndicator;
        default:
          return styles.greenIndicator;
      }
    };

    return (
      <TouchableHighlight onPress={this.onItemPressed()} underlayColor='#f7f7f7'>
        <View style={styles.container}>
          <View style={styles.imageBlock}>
            <Image
              style={styles.image}
              source={{ uri: imageURI }}
            />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.headerText}>{address}</Text>
            <View style={styles.statusAndAmount}>
              <View style={statusIndicator(status)} />
              <Text style={styles.text}>{this.printText(status)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 17,
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


export const ListItemComponent = connect(null, { onMarkerPressed })(ListItem);
