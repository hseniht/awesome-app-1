import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'materialize-css/dist/css/materialize.min.css';(from node can call directly)
import './../node_modules/materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducer/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'

const store = createStore(rootReducer,
   compose( //refer thunk & compose documentation
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), //1st store enhancer
      reduxFirestore(firebase, fbConfig), //2nd
      // reactReduxFirebase(fbConfig) //3rd.. depreciated since firebase v3
   )
);

const rrfProps = {
   firebase,
   config: fbConfig,
   dispatch: store.dispatch,
   createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
   <Provider store={store} >
      <ReactReduxFirebaseProvider {...rrfProps}>
         <App />
      </ReactReduxFirebaseProvider>
   </Provider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
