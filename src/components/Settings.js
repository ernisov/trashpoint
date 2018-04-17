import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { GREEN } from '../variables';
import Icon from 'react-native-vector-icons/Feather';
import { userNameFetch } from '../actions';

// Components Import
import {
  Screen,
  Section
} from './common';

class Settings extends Component {
  componentWillMount() {
    this.props.userNameFetch();
  }

  render() {
    return (
      <Screen>
        <TouchableOpacity onPress={() => Actions.editProfileScreen()}>
          <Section style={styles.userArea}>
            <View style={styles.userLeftArea}>
              <Text style={styles.userName}>
                {this.props.firstName} {this.props.lastName}
              </Text>
              <Text style={styles.userEdit}>
                Просмотр и редактирование профиля
              </Text>
            </View>
            <Image
              source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              style={styles.avatar}
            />
          </Section>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.notificationSettingsScreen()}>
          <Section style={styles.settingsArea}>
            <Text style={styles.settingsText}>
              Настройки уведомлений
            </Text>
            <Icon name='bell' style={styles.settingsIcon} size={26} />
          </Section>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.languageChangeScreen()}>
          <Section style={styles.settingsArea}>
            <Text style={styles.settingsText}>
              Язык
            </Text>
            <Text style={styles.languageText}>Русский</Text>
          </Section>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.problemReportScreen()}>
          <Section style={styles.settingsArea}>
            <Text style={styles.settingsText}>
              Сообщить о проблеме
            </Text>
            <Icon name='flag' style={styles.settingsIcon} size={26} />
          </Section>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.aboutAppScreen()}>
          <Section style={styles.settingsArea}>
            <Text style={styles.settingsText}>
              О приложении
            </Text>
            <Icon name='info' style={styles.settingsIcon} size={26} />
          </Section>
        </TouchableOpacity>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },
  userArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 20
  },
  userLeftArea: {
    justifyContent: 'space-around',
  },
  userName: {
    fontSize: 32,
    color: '#2d2d2d',
    fontWeight: '600',
  },
  userEdit: {
    fontSize: 16,
    color: '#4c4c4c',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60,
  },
  settingsArea: {
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
  settingsText: {
    alignSelf: 'center',
    fontSize: 21,
    color: '#4c4c4c',
  },
  languageText: {
    color: GREEN,
    fontSize: 16
  },
  settingsIcon: {
    color: '#4c4c4c',
  }
});

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName } = auth;
  return { firstName, lastName }
};

export default connect(mapStateToProps, {
  userNameFetch
})(Settings);