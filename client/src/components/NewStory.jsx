import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../lib/firebase';

class NewStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      description: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onUrlChange(e) {
    this.setState({ url: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const feed = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      userId: '1',
      userName: 'yabu',
      userIconUrl: 'http://example.com',
    };

    firebase.db.collection('feeds').add(feed).then((docRef) => {
      window.console.log(`id -> ${docRef.id}`);
      this.props.history.push('/');
    }).catch((error) => {
      window.alert(`AddDocumentError: ${error}`);
    });
  }

  render() {
    return (
      <div className="newStory">
        <form onSubmit={this.handleSubmit}>
          <div className="newStory_form">
            <label htmlFor="title">
              Title:
              <input
                id="title"
                type="text"
                value={this.state.title}
                onChange={this.onTitleChange}
              />
            </label>
          </div>
          <div className="newStory_form">
            <label htmlFor="url">
              Url:
              <input
                id="url"
                type="text"
                value={this.state.url}
                onChange={this.onUrlChange}
              />
            </label>
          </div>
          <div className="newStory_form">
            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                value={this.state.description}
                onChange={this.onDescriptionChange}
              />
            </label>
          </div>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

NewStory.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default NewStory;
