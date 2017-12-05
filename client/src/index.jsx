import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

import App from './components/app';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD7HY5esLhiupVV4niadE7hihb_wIB5CqQ',
  authDomain: 'techcasting-5d36a.firebaseapp.com',
  databaseURL: 'https://techcasting-5d36a.firebaseio.com',
  projectId: 'techcasting-5d36a',
  storageBucket: 'techcasting-5d36a.appspot.com',
  messagingSenderId: '772833070744',
};
firebase.initializeApp(config);

const authUiStart = () => {
  const uiConfig = {
    signInSuccessUrl: 'http://localhost:8080',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080',
  };
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
};

const initApp = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('account-details').style.display = 'block';
      user.getIdToken().then(() => {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('photoURL').src = user.photoURL;
        document.getElementById('displayName').textContent = user.displayName;
        document.getElementById('email').textContent = user.email;
      });
    } else {
      // User is signed out.
      document.getElementById('account-details').style.display = 'none';
      authUiStart();
    }
  }, (error) => {
    window.console.log(error);
  });
};

window.addEventListener('load', () => {
  initApp();
});

document.getElementsByClassName('signOut')[0].addEventListener('click', () => {
  firebase.auth().signOut();
});

ReactDOM.render(<App />, document.querySelector('.app'));
