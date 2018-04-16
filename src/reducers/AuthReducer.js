import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
  ERROR_SHOWED,
  MESSAGE,
  NOTVERIFIED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  user: null,
  error: '',
  loading: false,
  sent: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_SHOWED:
      return { ...state, error: '' };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_FAIL:
      return { ...state, password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, loading: false };
    case MESSAGE:
      return { ...state, sent: true, loading: false };
    case NOTVERIFIED:
      return { ...state, password: '', loading: false };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        password: '',
        error: '',
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        loading: false,
      };
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    default:
      return state;
  }
};