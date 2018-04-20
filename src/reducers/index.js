import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
import AuthReducer from './AuthReducer';
import MarkerReducer from './MarkerReducer';
import ActivityReducer from './ActivityReducer';

export default combineReducers({
    map: MapReducer,
    auth: AuthReducer,
    marker: MarkerReducer,
    activity: ActivityReducer
});

