import React from 'react';

import firebase from '../lib/firebase';

const Feed = () => (
  <div className="feeds">
    <div className="title">Feeds</div>
    <button
      className="signOut"
      onSubmit={(e) => {
        e.preventDefault();
        firebase.signOut();
      }}
    >sign out
    </button>
  </div>
);

export default Feed;
