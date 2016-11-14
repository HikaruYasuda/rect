import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from './routes';
import Header from './components/header';


export class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
    signOut: React.PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.TASKS);
    }
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />

        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}

export default connect(
  createSelector(
    getAuth,
    auth => ({ auth })
  ),
  authActions
)(App)
