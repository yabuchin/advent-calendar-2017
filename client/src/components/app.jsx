import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import FeedTable from './FeedTable';
import Login from './login';
import NewStory from './NewStory';
import Header from './header';
import firebase from '../lib/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = firebase.firebase;
    this.state = {
      user: firebase.user,
    };

    // ユーザの認証状態が変化したら呼ばれる
    this.firebase.auth().onAuthStateChanged((user) => {
      // ユーザ情報をｓtateに保存
      this.setState({ user });
      if (window.location.pathname === '/login') {
        window.location.href = '/';
      }
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
              <Route path="/newStory" component={NewStory} getFeeds={this.getFeeds} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
