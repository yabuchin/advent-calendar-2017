import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import FeedTable from './FeedTable';
import Login from './login';
import Header from './header';

const App = () => (
  <div>
    <Header />
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" component={FeedTable} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  </div>
);

export default App;
