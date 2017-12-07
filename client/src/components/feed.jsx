import React from 'react';
import PropTypes from 'prop-types';

import User from './user';
import firebase from '../lib/firebase';

const Feed = props => (
  <div className="feeds">
    <div className="title">Feeds</div>
    <User />
    <button
      className="signOut"
      onClick={(e) => {
        e.preventDefault();
        firebase.signOut();
        props.history.push('/');
      }}
    >sign out
    </button>
  </div>
);

Feed.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Feed;
