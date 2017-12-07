import firebase from 'firebase';
import firebaseui from 'firebaseui';


class Firebase {
  constructor() {
    this.firebase = firebase;

    const config = {
      apiKey: 'AIzaSyD7HY5esLhiupVV4niadE7hihb_wIB5CqQ',
      authDomain: 'techcasting-5d36a.firebaseapp.com',
      databaseURL: 'https://techcasting-5d36a.firebaseio.com',
      projectId: 'techcasting-5d36a',
      storageBucket: 'techcasting-5d36a.appspot.com',
      messagingSenderId: '772833070744',
    };
    this.firebase.initializeApp(config);

    this.uiConfig = {
      signInSuccessUrl: 'http://localhost:8080/feeds',
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

    // ログイン時の処理
    firebase.auth().onAuthStateChanged((user) => {
      if (user && window.location.pathname !== '/feeds') {
        /*
        document.getElementById('account-details').style.display = 'block';
        user.getIdToken().then(() => {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('photoURL').src = user.photoURL;
          document.getElementById('displayName').textContent = user.displayName;
          document.getElementById('email').textContent = user.email;
        });
        */
        // hrefでのページ遷移は絶対間違ってるけど、現状いい方法が分からないので放置
        window.location.href = '/feeds';
      } else if (!user && window.location.pathname !== '/') {
        // hrefでのページ遷移は絶対間違ってるけど、現状いい方法が分からないので放置
        window.location.href = '/';
      }
    }, (error) => {
      window.console.log(error);
    });
  }

  authUIStart() {
    this.authUi.start('.firebaseAuthUI', this.uiConfig);
  }

  signOut() {
    this.firebase.auth().signOut();
  }
}

export default new Firebase();
