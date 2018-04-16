import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
import AuthReducer from './AuthReducer';
import MarkerReducer from './MarkerReducer';

export default combineReducers({
    map: () => [],
    auth: AuthReducer,
});