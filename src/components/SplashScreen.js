import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image
} from 'react-native';
import {
  GREEN,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../variables';


class SplashScreen extends Component {
  state = {
    fade: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();
  }

  componentWillUnmount() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  }

  render () {
    let fade = this.state.fade;

    return (
      <Animated.View
        style={{ opacity: fade }}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    marginTop: SCREEN_HEIGHT * 0.2,
    alignSelf: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 9,
  },
});

export default SplashScreen;
