import firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import {
    SEND_MARKER,
    IMAGE_SHOT,
    CAMERA,
} from './types';

export const sendMarker = () => {
    return { type: SEND_MARKER };
};

export const getImage = () => {
    return (dispatch) => {
       ImagePicker.openCamera({
          width: 300,
          height: 400,
          compressImageQuality: 0.5,
          cropping: false,
      }).then(image => {
          const { uid } = firebase.auth().currentUser;
          const Blob = RNFetchBlob.polyfill.Blob;
          const fs = RNFetchBlob.fs;
          const Fetch = RNFetchBlob.polyfill.Fetch;
          window.fetch = new Fetch({
              auto: true,
              binaryContentTypes: ['image/'],
          }).build();
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
          window.Blob = Blob;
          let uploadBlob = '';

          const timestamp = new Date().getTime().toString();
          const imageRef = firebase.storage().ref(`users/${uid}/markers`).child(`${timestamp}.jpg`);

          let mime = 'image/jpg';

          fs.readFile(image.path, 'base64')
              .then(data => {
                  return Blob.build(data, { type: `${mime};BASE64` });
              })
              .then(blob => {
                  uploadBlob = blob;
                  return imageRef.put(blob, { contentType: mime });
              })
              .then(() => {
                  uploadBlob.close();
                  return imageRef.getDownloadURL();
              })
              .then(url => {

                  dispatch({
                     type: IMAGE_SHOT,
                     payload: url,
                  });
              });
      });
    };
};

export const positionAcquired = (position) => {

};

export const camera = () => ({ type: CAMERA });