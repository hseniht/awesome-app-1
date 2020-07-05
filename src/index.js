import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/App.scss';
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
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'


const store = createStore(rootReducer,
   compose( //refer thunk & compose documentation
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), //1st store enhancer
      reduxFirestore(firebase, fbConfig), //2nd
      // reactReduxFirebase(fbConfig) //3rd.. depreciated since firebase v3
   )
);

//customConfig
const customConfig = {
   // ...fbConfig, //now sure if needed, but just leaving it here for now
   userProfile: 'users',
   useFirestoreForProfile: true
   //any other config options can be added here
}

const rrfProps = {
   firebase,
   // config: fbConfig,  //dont think we need this as we're passing it from reduxFirestore() above
   config: customConfig,
   dispatch: store.dispatch,
   createFirestoreInstance, // <- needed if using firestore
   userProfile: 'users', // where profiles are stored in database
   presence: 'presence', // where list of online users is stored in database
   sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}

function AuthIsLoaded({ children }) {
   const auth = useSelector(state => state.firebase.auth)
   if (!isLoaded(auth)) return <div>Splash screen...</div>;
   return children
}

ReactDOM.render(
   <Provider store={store} >
      <ReactReduxFirebaseProvider {...rrfProps}>
         <AuthIsLoaded>
            <App />
         </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
   </Provider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
