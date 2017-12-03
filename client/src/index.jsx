import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

// Initialize Firebase
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
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
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'http://localhost:8080'
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);    
}

const initApp = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        document.getElementById('account-details').style.display='block';
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        //const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        //const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        //const providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('photoURL').src = photoURL;
          document.getElementById('displayName').textContent = displayName;
          document.getElementById('email').textContent = email;
          document.getElementById('phoneNumber').textContent = phoneNumber;
        });
      } else {
        // User is signed out.
        document.getElementById('account-details').style.display='none';
        authUiStart();
      }
    }, function(error) {
      console.log(error);
    });
  };

window.addEventListener('load', () => {
    initApp();
});

document.getElementsByClassName('signOut')[0].addEventListener(
    'click', () => {
        firebase.auth().signOut();
    }
);
  
//ReactDOM.render(<App />, document.querySelector('.container'));