import React, { Component } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import ImagePreview from 'react-native-image-preview';

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onPress() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View>
          <Image source={this.props.source} style={this.props.style} />
          <ImagePreview
            source={this.props.source}
            visible={this.state.visible}
            close={this.onPress.bind(this)}
            imageStyle={styles.image}
          />
        </View>
      </TouchableWithoutFeedback> 
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 0,
    marginRight: 0,
  },
});

export default Picture;