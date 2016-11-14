import React from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../core/auth';


export function SignIn({signInWithGithub, signInWithGoogle, signInWithTwitter}) {
  return (
    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <button className="btn sign-in__button" onClick={signInWithGithub} type="button">GitHub</button>
        <button className="btn sign-in__button" onClick={signInWithGoogle} type="button">Google</button>
        <button className="btn sign-in__button" onClick={signInWithTwitter} type="button">Twitter</button>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  signInWithGithub: React.PropTypes.func.isRequired,
  signInWithGoogle: React.PropTypes.func.isRequired,
  signInWithTwitter: React.PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  signInWithGithub: authActions.signInWithGithub.bind(null, dispatch),
  signInWithGoogle: authActions.signInWithGoogle.bind(null, dispatch),
  signInWithTwitter: authActions.signInWithTwitter.bind(null, dispatch),
}))(SignIn)
