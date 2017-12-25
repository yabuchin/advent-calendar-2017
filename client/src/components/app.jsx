import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import FeedTable from './FeedTable';
import Login from './login';
import NewStory from './NewStory';
import Document from './Document';
import Header from './header';
import firebase from '../lib/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = firebase.firebase;
    this.state = {
      user: null,
      FCMTokenSentToServer: false,
    };

    // ユーザの認証状態が変化したら呼ばれる
    this.firebase.auth().onAuthStateChanged((u) => {
      if (!u) {
        return;
      }

      // ユーザ情報をstateに保存して、ログイン画面なら記事一覧に移動
      const setUser = (user) => {
        this.setState({ user });
        if (window.location.pathname === '/login') {
          window.location.href = '/';
        }
      };

      // Firestoreにユーザが登録されていなければ新規登録
      const userRef = firebase.db.collection('users').doc(u.uid);

      userRef.get().then((userDoc) => {
        if (userDoc.exists) { // DBにユーザ登録済み
          const user = userDoc.data();
          user.userId = userDoc.id;
          window.console.log('user exists: ', user.userId);
          setUser(user);
          this.messagingFCM();
        } else { // DBに未登録
          // 新規ユーザデータを作成
          const newUser = {
            displayName: u.displayName,
            photoUrl: u.photoUrl ? u.photoUrl : '',
          };
          // ユーザIDをキーとしてFirestoreにnewUserを登録
          firebase.db.collection('users').doc(u.uid).set(newUser)
            .then((docRef) => {
              window.console.log('create user: ', docRef.key);
              const user = userDoc.data();
              user.userId = userDoc.id;
              window.console.log('user exists: ', user.userId);
              setUser(user);
            })
            .catch((error) => {
              window.console.error('can\'t create user:', error);
            });
        }
      }).catch((error) => {
        window.console.log('Error getting user document:', error);
      });
    }, (error) => {
      window.console.log(error);
    });
  }

  messagingFCM() {
    // FCM
    const messaging = firebase.msg;

    // サーバにトークンを送ったかどうかのフラグをstateに保存
    const setTokenSentToServer = (sent) => {
      this.setState({ FCMTokenSentToServer: sent });
    };

    // Firestoreのユーザデータにトークンを保存しておく
    const sendTokenToServer = (token) => {
      if (this.state.FCMTokenSentToServer) {
        window.console.log('Token already sent to server');
        return;
      }
      // window.console.log('currentToken: ', token);
      const newUser = this.state.user;
      newUser.fcmToken = token;
      firebase.db.collection('users')
        .doc(this.state.user.userId)
        .set(newUser)
        .then(() => {
          window.console.log('successfully: send token to server');
          this.setState({ FCMTokenSentToServer: true });
        })
        .catch((error) => {
          window.console.log('error: send token toserver, ', error);
        });
    };

    // FCMのトークン取得
    const getToken = () => {
      messaging.getToken()
        .then((currentToken) => {
          if (currentToken) {
            sendTokenToServer(currentToken);
          } else {
            // Show permission request.
            window.console.log('No Instance ID token available. Request permission to generate one.');
            setTokenSentToServer(false);
          }
        })
        .catch((err) => {
          window.console.log('An error occurred while retrieving token. ', err);
          setTokenSentToServer(false);
        });
    };

    // プッシュ通知のパーミッションをユーザにもらう（ダイアログが表示される）
    const requestPermission = () => {
      messaging.requestPermission()
        .then(() => {
          window.console.log('Notification permission granted.');
          getToken();
        })
        .catch((err) => {
          window.console.log('Unable to get permission to notify.', err);
        });
    };

    // トークンが更新されたら呼ばれる
    messaging.onTokenRefresh(() => {
      messaging.getToken()
        .then((refreshedToken) => {
          // トークンが更新されたので、サーバに再アップロード
          window.console.log('Token refreshed.');
          setTokenSentToServer(false);
          sendTokenToServer(refreshedToken);
        })
        .catch((err) => {
          window.console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // メッセージ受取
    messaging.onMessage((payload) => {
      window.console.log('Message received. ', payload);
    });

    requestPermission();
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={FeedTable} />
              <Route path="/login" component={Login} />
              <Route
                path="/newStory"
                render={props => <NewStory {...props} user={this.state.user} />}
              // component={NewStory}
              // user={this.state.user}
              />
              <Route
                path="/document/:id"
                render={props => <Document {...props} user={this.state.user} />}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
