import { browserHistory, match } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux'
import routes from './routes'

export const CATCH_AUTH_ERROR = Symbol('CATCH_AUTH_ERROR')

export default store => {
  let route = null;
  return next => action => {
    if (action && action.error && action.error.response) {
      const { response } = action.error
      const authErrors = /^(token_not_provided)$/
      if (response.status == 401
        || (response.status == 400 && authErrors.test(response.data.error||''))) {
        store.dispatch({ type: CATCH_AUTH_ERROR, response: response })
        if (action.redirectTo) {
          browserHistory.replace(action.redirectTo)
        }
      }
    }
    const prevAuth = (state => state.auth.loggedIn)(store.getState())
    next(action)
    const loggedIn = (state => state.auth.loggedIn)(store.getState())
    const changed = prevAuth != loggedIn

    if (action.type === LOCATION_CHANGE) {
      const location = action.payload
      match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error || redirectLocation) {
          return
        }
        route = renderProps.routes[renderProps.routes.length - 1]
        if (route.auth && ! loggedIn) {
//                    browserHistory.replace('/login')
        } else if (route.guest) {
//                    browserHistory.replace('/')
        }
      })
    } else if (route && changed) {
      if (route.auth && ! loggedIn) {
        browserHistory.replace('/login')
      } else if (route.guest && loggedIn) {
        browserHistory.replace('/')
      }
    }
  }
}
