import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class TabIcon extends Component {
    render() {
        let icon = this.props.focused ? styles.active : styles.inactive;

        return (
            <View style={styles.container}>
                <Icon style={icon} name={this.props.iconName} size={20}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        color: '#2AD2AC',
    },
    inactive: {
        color: '#2D2D2D',
    },
});

export default TabIcon;