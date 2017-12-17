import firebase from 'firebase';
import 'firebase/firestore';
import firebaseui from 'firebaseui';


class Firebase {
  constructor() {
    this.firebase = firebase;
    this.user = null;

    const config = {
      apiKey: 'AIzaSyD7HY5esLhiupVV4niadE7hihb_wIB5CqQ',
      authDomain: 'techcasting-5d36a.firebaseapp.com',
      databaseURL: 'https://techcasting-5d36a.firebaseio.com',
      projectId: 'techcasting-5d36a',
      storageBucket: 'techcasting-5d36a.appspot.com',
      messagingSenderId: '772833070744',
    };
    this.firebase.initializeApp(config);

    this.db = this.firebase.firestore();

    this.uiConfig = {
      signInSuccessUrl: 'http://localhost:8080',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: 'http://localhost:8080',
    };
    this.authUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

  authUIStart() {
    this.authUi.start('.firebaseAuthUI', this.uiConfig);
  }

  signOut() {
    this.firebase.auth().signOut();
  }

  feeds() {
    return this.db.collection('feeds').get();
  }
}

export default new Firebase();
