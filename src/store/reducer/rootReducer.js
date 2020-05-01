import authReducer from "./authReducer"
import projectReducer from "./projectReducer"
import { combineReducers } from 'redux'

//those object are going to be states in our redux
const rootReducer = combineReducers({
   auth: authReducer,
   project: projectReducer
})

export default rootReducer