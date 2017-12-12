import React from 'react';
import PropTypes from 'prop-types';

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
          <div
            className="user"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              window.console.log(this.props.user);
              window.location.href = '/login';
            }}
            onKeyPress={this.handleKeyPress}
          >
            login
          </div>
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
