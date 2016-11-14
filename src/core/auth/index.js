import firebase from 'firebase'
import { firebaseAuth } from 'src/core/firebase'
import { combineReducers } from 'redux'
import mapper from 'redux-state-mapper'
import actions, * as types from './actions'

export * from './actions'
export actions from './actions'
export select, * as selectors from './selectors'

export const reducer = combineReducers({
  authenticated: mapper(false)
    .when(types.INIT_AUTH, (state, { payload }) => !!payload )
    .when(types.SUCCESS_SIGN_IN, () => true)
    .when(types.SUCCESS_SIGN_OUT, () => false),
  id: mapper(null)
    .when(types.INIT_AUTH, types.SUCCESS_SIGN_IN, (state, { payload }) => (payload ? payload.uid : null) )
})

export const initialize = dispatch => new Promise((resolve, reject) => {
  const unSubscribe = firebaseAuth.onAuthStateChanged(
    user => {
      dispatch(actions.init(user))
      unSubscribe()
      resolve()
    },
    error => reject(error)
  )
})

const authenticate = (dispatch, provider) => {
  dispatch(actions.signIn.request())
  return firebaseAuth.signInWithPopup(provider)
    .then(result => dispatch(actions.signIn.success(result)))
    .catch(error => dispatch(actions.signIn.failure(error)))
}

export const signInWithGithub = dispatch => authenticate(dispatch, new firebase.auth.GithubAuthProvider)

export const signInWithGoogle = dispatch => authenticate(dispatch, new firebase.auth.GoogleAuthProvider)

export const signInWithTwitter = dispatch => authenticate(dispatch, new firebase.auth.TwitterAuthProvider)

export const signOut = dispatch => firebaseAuth.signOut()
  .then(() => dispatch(actions.signOut.success()))
