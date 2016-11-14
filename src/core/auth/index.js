import firebase from 'firebase'
import { firebaseAuth } from 'src/core/firebase'
import { combineReducers } from 'redux'
import mapper from 'redux-state-mapper'
import actions, * as types from './actions'

export const reducer = combineReducers({
  authenticated: mapper(false)
    .when(types.INIT_AUTH, (state, { payload }) => !!payload )
    .when(types.SUCCESS_SIGN_IN, true)
    .when(types.SUCCESS_SIGN_OUT, false),
  id: mapper(null)
    .when(types.INIT_AUTH, types.SUCCESS_SIGN_IN, (state, { payload }) => (payload ? payload.uid : null) )
})

class Auth {
  reducer = reducer
  select = state => state.auth
  actions = { ...types, ...actions }

  initialize(dispatch) {
    return new Promise((resolve, reject) => {
      const unSubscribe = firebaseAuth.onAuthStateChanged(
        user => {
          dispatch(actions.init(user))
          unSubscribe()
          resolve()
        },
        error => reject(error)
      )
    })
  }
  authenticate(dispatch, provider) {
    dispatch(actions.signIn.request())
    return firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(actions.signIn.success(result)))
      .catch(error => dispatch(actions.signIn.failure(error)))
  }
  signInWithGithub(dispatch) {
    return this.authenticate(dispatch, new firebase.auth.GithubAuthProvider())
  }
  signInWithGoogle(dispatch) {
    return this.authenticate(dispatch, new firebase.auth.GoogleAuthProvider())
  }
  signInWithTwitter(dispatch) {
    return this.authenticate(dispatch, new firebase.auth.TwitterAuthProvider())
  }
  signOut(dispatch) {
    return firebaseAuth.signOut()
      .then(() => dispatch(actions.signOut.success()))
  }
}
export default new Auth()
