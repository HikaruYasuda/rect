import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as auth } from './auth'

export default combineReducers({
  auth,
  routing,
})
