import React from 'react';

import firebase from '../lib/firebase';

class Login extends React.Component {
  componentDidMount() {
    firebase.authUIStart();
  }

  render() {
    return (
      <div className="firebaseAuthUI" />
    );
  }
}

export default Login;
