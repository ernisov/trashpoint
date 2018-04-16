import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Router from './Router';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyB8JlsGOkUcRnG4M3D3GiJ9yDeqNJ_hX9o',
            authDomain: 'taza-jasho.firebaseapp.com',
            databaseURL: 'https://taza-jasho.firebaseio.com',
            projectId: 'taza-jasho',
            storageBucket: 'taza-jasho.appspot.com',
            messagingSenderId: '1033397887766'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;