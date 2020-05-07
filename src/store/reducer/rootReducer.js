import authReducer from "./authReducer"
import projectReducer from "./projectReducer"
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

//those object are going to be states in our redux
const rootReducer = combineReducers({
   auth: authReducer,
   project: projectReducer,
   firestore: firestoreReducer, //from firestore
   firebase: firebaseReducer //from firebase
})

export default rootReducer