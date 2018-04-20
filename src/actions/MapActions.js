import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    POSITION_CHANGED,
    GET_MARKERS,
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
    firebase.database().ref(`/markers`).on('value', (snapshot) => {
      const marks = snapshot.val();
      let markers = {};
      for (const user in marks) {
        let m = _.map(marks[user], (val, id) => {
          return { ...val, id };
        });
        markers = [...markers, ...m];
      }

      dispatch({ type: GET_MARKERS, payload: markers });
    });
  };
};
