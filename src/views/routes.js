import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/app'
import Home from './containers/Home'
import Login from './containers/Login'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} auth={true}/>
    <Route path="login" component={Login} guest={true}/>
    <Route path="videos" auth={true}>
      <IndexRoute component={VideoList}/>
      <Route path="create" component={VideoCreate}/>
      <Route path=":id" component={VideoDetail}/>
    </Route>
  </Route>
)

import { isAuthenticated } from 'src/core/auth';
import SignIn from './pages/sign-in';
import Tasks from './pages/tasks';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  TASKS: '/'
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.TASKS);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Tasks,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      }
    ]
  };
}

export default (
  <Route path={ paths.ROOT } component={ App }>
    <IndexRoute component={Home} auth={true}/>
    <Route path="login" component={Login} guest={true}/>
    <Route path="videos" auth={true}>
      <IndexRoute component={VideoList}/>
      <Route path="create" component={VideoCreate}/>
      <Route path=":id" component={VideoDetail}/>
    </Route>
  </Route>
)
