import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, Alert } from 'react-native';
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
  LAST_NAME_CHANGED,
  NAME_FETCH_SUCCESS
} from './types';

export const emailChanged = (text) => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = (text) => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const firstNameChanged = (text) => ({
  type: FIRST_NAME_CHANGED,
  payload: text,
});

export const lastNameChanged = (text) => ({
  type: LAST_NAME_CHANGED,
  payload: text,
});

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        AsyncStorage.getItem('LoggedInWithEmail')
          .then(LoggedInWithEmail => {
            if (LoggedInWithEmail !== email) {
              AsyncStorage.setItem('LoggedInWithEmail', email);
            }
          })
          .then(() => {
            if (firebase.auth().currentUser.emailVerified) {
              loginUserSuccess(dispatch, user);
            } else {
              firebase.auth().signOut().then(() => {
                Alert.alert(
                  'Подтвердите ваш аккаунт',
                  'Подтвердите ваш почтовый адрес',
                  [
                    { text: 'Ok' },
                  ]
                );
                dispatch({ type: NOTVERIFIED });
              });
            }
          });
      }).catch(() => loginUserFail(dispatch));
  };
};

export const registerUser = ({ email, password, firstName, lastName }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then((user) => {
        firebase.database().ref('/users').child(user.uid)
          .set({ email: email.toLowerCase(), firstName, lastName })
          .then(() => {
            AsyncStorage.getItem('LoggedInWithEmail')
              .then(LoggedInWithEmail => {
                if (LoggedInWithEmail !== email) {
                  AsyncStorage.setItem('LoggedInWithEmail', email);
                }

                firebase.auth().currentUser.sendEmailVerification()
                  .then(() => {
                    Alert.alert(
                      'Подтвердите ваш аккаунт',
                      'Подтвердите ваш почтовый адрес',
                      [
                        { text: 'Ok' },
                      ]
                    );
                    dispatch({ type: MESSAGE });
                    Actions.register();
                  }).catch(() => console.log('email not sent'));
              });
          });
      }).catch((error) => {
      console.log(error.message);
      Alert.alert(
        'Попробуйте еще раз!',
        error.message,
        [
          { text: 'Ok' },
        ]
      );
        registerUserFail(dispatch);
    });
  };
};

const loginUserFail = () => ({ type: LOGIN_USER_FAIL });

const registerUserFail = () => ({ type: REGISTER_USER_FAIL });

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  Actions.tabBar({ type: 'reset' });
};

export const errorShowed = () => ({ type: ERROR_SHOWED });

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_USER });
        Actions.login({ loading: false });
      });
  };
};

export const userNameFetch = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        dispatch({type: NAME_FETCH_SUCCESS, firstName: data.firstName, lastName: data.lastName});
      })
    }
};

export const newUserNameSave = ({ email ,firstName, lastName }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ email, firstName, lastName });
    Actions.pop({ type: 'reset' });
  }
};