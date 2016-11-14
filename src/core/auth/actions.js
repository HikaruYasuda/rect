export const INIT_AUTH = Symbol('INIT_AUTH')
export const REQUEST_SIGN_IN = Symbol('R_SIGN_IN')
export const SUCCESS_SIGN_IN = Symbol('S_SIGN_IN')
export const FAILURE_SIGN_IN = Symbol('F_SIGN_IN')
export const SUCCESS_SIGN_OUT = Symbol('S_SIGN_OUT')

export default {
  init: user => ({ type: INIT_AUTH, payload: user }),
  signIn: {
    request: () => ({ type: REQUEST_SIGN_IN }),
    success: res => ({ type: SUCCESS_SIGN_IN, payload: res.user }),
    failure: err => ({ type: FAILURE_SIGN_IN, error: err })
  },
  signOut: {
    success: () => ({ type: SUCCESS_SIGN_OUT })
  }
}
