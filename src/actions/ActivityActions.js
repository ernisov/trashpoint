import _ from 'lodash';
import firebase from 'firebase';
import {
  DATA
} from './types';

export const dataset = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    let data = [];
    firebase.database().ref(`/markers/${currentUser.uid}`).on('value', (snapshot) => {
      const markers = _.map(snapshot.val(), (val, id) => {
        return { ...val, id };
      });
      data = [ ...markers ];
    });
    firebase.database().ref(`/contributions/${currentUser.uid}`).on('value', (snapshot) => {
      const contributions = _.map(snapshot.val(), (val, id) => {
        return { ...val, id };
      });
      data = [ ...data, ...contributions ];
      data = data.sort((a, b) => {
        if (a.timestamp < b.timestamp) return 1;
        if (a.timestamp > b.timestamp) return -1;
        return 0;
      });
      dispatch({ type: DATA, payload: data })
    });
  }
};

