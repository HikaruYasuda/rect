import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { isAuthenticated } from '../core/auth/selectors'
import App from './pages/app'
import Home from './pages/home'
import SignIn from './pages/sign-in'

export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  HOME: '/'
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  }
}

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.HOME);
    }
  }
}

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } auth={true}/>
    <Route path={ paths.SIGN_IN } component={ SignIn } guest={true}/>
  </Route>
)
