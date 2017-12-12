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
  constructor() {
    super();
    this.user = firebase.user;
  }

  render() {
    return (
      <div>
        <Header user={this.user} />
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={FeedTable} />
              <Route path="/login" component={Login} />
              <Route path="/newStory" component={NewStory} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
