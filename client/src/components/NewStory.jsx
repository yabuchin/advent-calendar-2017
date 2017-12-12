import React from 'react';
import PropTypes from 'prop-types';

import feedService from '../domain/FeedService';

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
    feedService.add(this.state.title, this.state.url, this.state.description);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="newStory">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Title:
            <input
              id="title"
              type="text"
              value={this.state.title}
              onChange={this.onTitleChange}
            />
          </label>
          <label htmlFor="url">
            Url:
            <input
              id="url"
              type="text"
              value={this.state.url}
              onChange={this.onUrlChange}
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

NewStory.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default NewStory;
