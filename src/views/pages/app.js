import React from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../core/auth/selectors'
import { signOut } from '../../core/auth'
import { paths } from '../routes'
import Header from '../components/header'

export class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    signOut: React.PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context
    const { isAuthenticated } = this.props

    if (isAuthenticated && !nextProps.isAuthenticated) {
      router.replace(paths.SIGN_IN)
    } else if (!isAuthenticated && nextProps.isAuthenticated) {
      router.replace(paths.HOME)
    }
  }

  render() {
    const { isAuthenticated, signOut, children } = this.props
    return (
      <div>
        <Header
          authenticated={ isAuthenticated }
          onSignOut={ signOut }
        />
        <main className="main">{ children }</main>
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: isAuthenticated(state)
}), dispatch => ({
  signOut: dispatch => signOut(dispatch)
}))(App)
