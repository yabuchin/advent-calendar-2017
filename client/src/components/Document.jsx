import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../lib/firebase';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      document: {
        title: '',
        url: '',
        description: '',
        userName: '',
      },
    };

    firebase.db
      .collection('documents')
      .doc(this.props.match.params.id)
      .get()
      .then((docRef) => {
        this.setState({
          document: docRef.data(),
        });
      });

    this.onCommentChange = this.onCommentChange.bind(this);
  }

  onCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    //window.console.log(this.state.comment);
  }

  render() {
    return (
      <div className="document">
        <div className="document_title">
          {this.state.document.title}
        </div>
        <div className="document_link">
          <a href={this.state.document.url}>{this.state.document.url}</a>
        </div>
        <div className="document_description">
          {this.state.document.description}
        </div>
        <div className="document_userName">
          {this.state.document.userName}
        </div>
        <div className="comments">
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="comment"
              value={this.state.comment}
              onChange={this.onCommentChange}
            />
            <input type="submit" value="comment" />
          </form>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Document;
