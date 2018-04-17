import {
    SEND_MARKER,
    IMAGE_SHOT,
    CAMERA,
} from '../actions/types';

const INITIAL_STATE = {
  latlng: {
    latitude: 42.8745414,
    longitude: 74.5854767,
  },
  address: '',
  imageURI: [],
  authorID: '',
  contributorsID: '',
  status: 'red',
  amount: 0,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CAMERA:
    return { ...state, loading: true };
  case IMAGE_SHOT:
    return { ...state, imageURI: [...state.imageURI, action.payload], loading: false };
  default:
    return state;
  }
};