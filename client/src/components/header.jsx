import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../lib/firebase';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = () => {
      window.console.log('key pressed');
    };
  }

  render() {
    return (
      <div className="header">
        <div className="nav">
          <div className="title">
            <a href="/">hacker news</a>
          </div>
          {this.props.user ?
            <HeaderMenu user={this.props.user} /> : <LoginButton />}
          <div
            className="newStoryBtn"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'newStory';
            }}
            onKeyPress={this.handleKeyPress}
          >
            New Story
          </div>
        </div>
      </div>
    );
  }
}

const handleKeyPress = () => {};

const HeaderMenu = props => (
  <div className="headerMenu">
    <div className="userName">
      {props.user.displayName}
    </div>
    <div
      className="signOutButton"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        firebase.signOut();
      }}
      onKeyPress={handleKeyPress}
    >
      sign out
    </div>
  </div>
);

HeaderMenu.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

HeaderMenu.defaultProps = {
  user: null,
};

const LoginButton = () => (
  <div
    className="login"
    role="button"
    tabIndex={0}
    onClick={(e) => {
      e.preventDefault();
      window.location.href = '/login';
    }}
    onKeyPress={handleKeyPress}
  >
    login
  </div>
);


Header.handleKeyPress = () => { };

Header.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: {
    displayName: 'signed out',
  },
};

export default Header;
