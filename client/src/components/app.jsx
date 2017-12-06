import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Feed from './feed';
import Login from './login';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/feeds" component={Feed} />
    </Switch>
  </Router>
);

export default App;
