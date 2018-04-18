import {
  CONTRIBUTIONS_FETCH,
  MARKERS_FETCH,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTRIBUTIONS_FETCH:
      return state;
    case MARKERS_FETCH:
      return state;
    default:
      return state;
  }
};