import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import Map from './components/Map';
import Activity from './components/Activity';
import AddMarker from './components/AddMarker';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import TabIcon from './components/TabIcon';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import MarkerDetails from './components/MarkerDetails';
import Profile from './components/settings/Profile';
import {
  NotificationSettings,
  LanguageChange,
  ProblemReport,
  AboutApp
} from './components/settings/index';

import {
  imageButton,
} from './actions';

class RouterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '0',
    };
    const that = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        that.setState({ user: '1', loading: false });
      } else {
        that.setState({ user: '0', loading: false });
      }
    });
  }

  render() {
    return (
      <Router>
        <Scene key='root' hideNavBar>

          <Scene key='loginStart' hideNavBar>
            <Scene
              key='login'
              component={LoginForm}
              initial={this.state.user === '0'}
            />
            <Scene key='register' component={Register} />
          </Scene>


          <Scene
            key='tabBar'
            tabBarStyle={styles.tabBar}
            tabs
            hideNavBar
            tabBarPosition='bottom'
            swipeEnabled={false}
            animationEnabled={false}
            showLabel={false}
            initial={this.state.user === '1'}
          >
            <Scene
              key='mapScreen'
              title='Map'
              iconName={this.props.isList ? 'list' : 'map'}
              icon={TabIcon}
              hideNavBar
            >
              <Scene key='map' component={Map} hideNavBar />
            </Scene>

            <Scene
              key='activityScreen'
              title='activity'
              iconName='zap'
              icon={TabIcon}
              hideNavBar
            >
              <Scene key='activity' component={Activity} />
            </Scene>

            <Scene
              key='addMarkerScreen'
              title='Add Marker'
              iconName='plus-square'
              icon={TabIcon}
              tabBarOnPress={this.props.imageButton.bind(this)}
              hideNavBar
            >
              <Scene key='addMarker' component={AddMarker} />
            </Scene>

            <Scene
              key='notificationsScreen'
              title='Notifications'
              iconName='bell'
              icon={TabIcon}
              hideNavBar
            >
              <Scene key='notifications' component={Notifications} />
            </Scene>

            <Scene
              key='settingsScreen'
              title='Настройки'
              iconName='settings'
              icon={TabIcon}
              hideNavBar
            >
              <Scene key='Settings' hideNavBar={false} component={Settings} />
            </Scene>

          </Scene>

          <Scene key='marker' component={AddMarker} />
          <Scene key='MarkerDetails' component={MarkerDetails} />

          {/* SETTINGS */}
          <Scene
            key='editProfileScreen'
            hideNavBar={false}
            title='Profile'
            component={Profile}
          />
          <Scene
            key='notificationSettingsScreen'
            hideNavBar={false}
            title='Настройка уведомлений'
            component={NotificationSettings}
          />
          <Scene
            key='languageChangeScreen'
            hideNavBar={false}
            title='Язык'
            component={LanguageChange}
          />
          <Scene
            key='problemReportScreen'
            hideNavBar={false}
            title='Сообщить о проблеме'
            component={ProblemReport}
          />
          <Scene
            key='aboutAppScreen'
            hideNavBar={false}
            title='О приложении'
            component={AboutApp}
          />
          {/* SETTINGS END */}

        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF',
  },
});

const mapStateToProps = (state) => {
  const { isList } = state.map;

  return { isList };
};

export default connect(mapStateToProps, { imageButton })(RouterComponent);
