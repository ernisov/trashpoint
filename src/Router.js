import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Map from './components/Map';
import Activity from './components/Activity';
import AddMarker from './components/AddMarker';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import TabIcon from './components/TabIcon';

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>

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
                        initial
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