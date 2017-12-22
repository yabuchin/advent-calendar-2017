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
              <Route path="/document/:id" component={Document} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
