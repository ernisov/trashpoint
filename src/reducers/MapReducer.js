import {
  POSITION_CHANGED,
  GET_MARKERS,
  SHOW_MARKER_DETAILS,
  MARKER_PRESSED,
  MAP_SWITCH,
} from '../actions/types';

import {
  ASPECT_RATIO,
} from '../variables';

const INITIAL_STATE = {
  position: {
    latitude: 42.8745414,
    longitude: 74.5854767,
    latitudeDelta: 0.00222,
    longitudeDelta: 0.00222 * ASPECT_RATIO,
  },
  markers: [],
  isList: false,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSITION_CHANGED:
      return { ...state, position: action.payload };
    case GET_MARKERS:
      return { ...state, markers: action.payload };
    case MAP_SWITCH:
      return { ...state, isList: !state.isList };
    case MARKER_PRESSED:
    default:
      return state;
  };
};
