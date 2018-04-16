import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { logoutUser } from "../../actions";
import {
  Screen,
  Section,
} from '../common';
import {RED} from "../../variables";

class Profile extends Component {
  render() {
    return (
      <Screen>
        <Section style={styles.userArea}>
          <Image
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            style={styles.avatar}
          />
        </Section>
        <Section style={styles.changeArea}>
          <Text style={styles.changeText}>
            Изменить пароль
          </Text>
          <Icon name='chevron-right' style={styles.settingsIcon} size={26}/>
        </Section>
        <TouchableOpacity onPress={() => {
          this.props.logoutUser()
        }}>
          <Section style={styles.exitArea}>
            <Text style={styles.exitText}>
              Выход
            </Text>
            <Icon name='log-out' style={styles.logOutIcon} size={26}/>
          </Section>
        </TouchableOpacity>
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  userArea: {
    alignItems: 'center',
    paddingVertical: 20
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60,
  },
  changeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 0,
    marginHorizontal: 10,
    paddingVertical: 20
  },
  changeText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
  },
  settingsIcon: {
    color: '#4c4c4c',
  },
  exitArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 0,
    marginHorizontal: 10,
    paddingVertical: 20
  },
  exitText: {
    alignSelf: 'center',
    fontSize: 24,
    color: RED,
  },
  logOutIcon: {
    color: RED
  }
});

console.disableYellowBox = true;

const mapStateToProps = ({ auth }) => {
  const {} = auth
  return {}
}

export default connect(mapStateToProps, {
  logoutUser
})(Profile)