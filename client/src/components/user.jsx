import React from 'react';

import firebase from '../lib/firebase';

class User extends React.Component {
  constructor() {
    super();
    this.user = firebase.user;
  }

  render() {
    if (this.user) {
      return (
        <div className="user">
          <div className="accountDetails">
            <div className="signInStatus">Signed in</div>
            <div className="profile">
              <div className="profileIcon">
                <img className="photoURL" src="{this.user.photoUrl}" alt="profile icon" />
              </div>
              <div className="profileDetail">
                <div className="displayName" />
                <div className="email" />
                <div className="phoneNumber" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default User;
