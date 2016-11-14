import {
  INIT_AUTH,
  SUCCESS_SIGN_IN,
  SUCCESS_SIGN_OUT,
} from './actions';
import { reducer } from './index';

describe('Auth reducer', () => {
  describe('INIT_AUTH', () => {
    it('should set AuthState.authenticated to false when payload is null', () => {
      let state = reducer(undefined, {
        type: INIT_AUTH,
        payload: null
      });

      expect(state.authenticated).toBe(false);
      expect(state.id).toBe(null);
    });

    it('should set AuthState.authenticated to true when payload provided', () => {
      let state = reducer(undefined, {
        type: INIT_AUTH,
        payload: {uid: '123'}
      });

      expect(state.authenticated).toBe(true);
      expect(state.id).toBe('123');
    });
  });


  describe('SIGN_IN_SUCCESS', () => {
    it('should set AuthState.authenticated to true', () => {
      let state = reducer(undefined, {
        type: SUCCESS_SIGN_IN,
        payload: {uid: '123'}
      });

      expect(state.authenticated).toBe(true);
      expect(state.id).toBe('123');
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should set AuthState.authenticated to false', () => {
      let state = reducer(undefined, {
        type: SUCCESS_SIGN_OUT
      });

      expect(state.authenticated).toBe(false);
      expect(state.id).toBe(null);
    });
  });
});
