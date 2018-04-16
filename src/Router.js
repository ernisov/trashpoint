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

                    {/* TAB BAR */}
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
                            iconName='map'
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
                            hideNavBar
                        >
                            <Scene key='addMarker' component={AddMarker} initial/>
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
                            title='Settings'
                            iconName='settings'
                            icon={TabIcon}
                            hideNavBar
                        >
                            <Scene key='Settings' component={Settings} />
                        </Scene>

                    </Scene>
                    {/* TAB BAR END */}

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

export default connect(null)(RouterComponent);