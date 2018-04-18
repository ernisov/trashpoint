import firebase from 'firebase';
import {
  CONTRIBUTIONS_FETCH,
  MARKERS_FETCH,
} from './types';

export const markersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/markers/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: MARKERS_FETCH, payload: snapshot.val() });
      });
  };
};

export const contributionsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/contributions/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: CONTRIBUTIONS_FETCH, payload: snapshot.val() });
      });
  };
};