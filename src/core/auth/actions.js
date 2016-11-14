export const INIT = Symbol('auth/INIT')
export const REQUEST_SIGN_IN = Symbol('auth/R_SIGN_IN')
export const SUCCESS_SIGN_IN = Symbol('auth/S_SIGN_IN')
export const FAILURE_SIGN_IN = Symbol('auth/F_SIGN_IN')
export const SUCCESS_SIGN_OUT = Symbol('auth/S_SIGN_OUT')

export default {
  init: user => ({ type: INIT, payload: user }),
  signIn: {
    request: () => ({ type: REQUEST_SIGN_IN }),
    success: res => ({ type: SUCCESS_SIGN_IN, payload: res.user }),
    failure: err => ({ type: FAILURE_SIGN_IN, error: err })
  },
  signOut: {
    success: () => ({ type: SUCCESS_SIGN_OUT })
  }
}
