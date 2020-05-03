import authReducer from "./authReducer"
import projectReducer from "./projectReducer"
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

//those object are going to be states in our redux
const rootReducer = combineReducers({
   auth: authReducer,
   project: projectReducer,
   firestore: firestoreReducer
})

export default rootReducer