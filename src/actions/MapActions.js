import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    POSITION_CHANGED,
    GET_MARKERS,
    SHOW_MARKER_DETAILS,
    MARKER_PRESSED,
    MAP_SWITCH,
} from './types';
import {
    ASPECT_RATIO,
} from '../variables';

const latitudeDelta = 0.0322;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;

export const mapSwitch = () => ({ type: MAP_SWITCH });

export const positionChanged = (position) => {
    const latitude = parseFloat(position.coords.latitude);
    const longitude = parseFloat(position.coords.longitude);

    const coordinates = {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    };

    return { type: POSITION_CHANGED, payload: coordinates };
};

export const getMarkers = () => {
    return (dispatch) => {
        firebase.database().ref('/markers').on('value', (snapshot) => {
            dispatch({ type: GET_MARKERS, payload: snapshot.val() });
        });
    };
};

export const onMarkerPressed = (props) => {
    Actions.markerDetails({ title: props.address, ...props });
    return { type: MARKER_PRESSED };
};