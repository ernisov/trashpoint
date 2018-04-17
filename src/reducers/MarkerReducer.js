import {
  SEND_MARKER,
  IMAGE_SHOT,
  CAMERA,
  POSITION_ACQUIRED,
  AMOUNT_CHANGED,
} from '../actions/types';
import {
  ASPECT_RATIO
} from '../variables';

const INITIAL_STATE = {
  latlng: {
    latitude: 42.8745414,
    longitude: 74.5854767,
    latitudeDelta: 0.00222,
    longitudeDelta: 0.00222 * ASPECT_RATIO,
  },
  address: '',
  imageURI: [],
  authorID: '',
  contributorsID: '',
  status: 'red',
  amount: 1,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload };
    case POSITION_ACQUIRED:
      return { ...state, address: action.payload.address, latlng: action.payload.latlng };
    case CAMERA:
      return { ...state, loading: true };
    case IMAGE_SHOT:
      return { ...state, imageURI: [...state.imageURI, action.payload], loading: false };
    default:
      return state;
  }
};