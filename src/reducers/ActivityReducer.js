import {
  DATA
} from '../actions/types';

const INITIAL_STATE = {
  markers: [],
  contributions: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA:
      return { ...state, data: [...action.payload] };
    default:
      return state;
  }
};