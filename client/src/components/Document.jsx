import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

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
      comments: [],
    };

    const doc = firebase.db
      .collection('documents')
      .doc(this.props.match.params.id);

    doc.get()
      .then((docRef) => {
        this.setState({
          document: docRef.data(),
        });
      });

    doc
      .collection('comments')
      .get()
      .then((querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((d) => {
          const comment = d.data();
          comments.push(comment);
        });
        this.setState({ comments });
      });

    this.onCommentChange = this.onCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const commentId = uuid();
    const comment = {
      commentId,
      comment: this.state.comment,
      documentId: this.props.match.params.id,
      userId: this.props.user.userId,
      userName: this.props.user.displayName,
    };

    const batch = firebase.db.batch();

    const commentRef =
      firebase.db
        .collection('users')
        .doc(this.props.user.userId)
        .collection('comments')
        .doc(commentId);
    batch.set(commentRef, comment);

    const commentRefInDocuments =
      firebase.db
        .collection('documents')
        .doc(this.props.match.params.id)
        .collection('comments')
        .doc(commentId);
    batch.set(commentRefInDocuments, comment);

    // バッチをコミット
    batch.commit()
      .then(() => {
        // 成功したら、ログを出して、フィート一覧に戻る
        window.console.log('document create succeeded');
        const newComments = [comment].concat(this.state.comments);
        this.setState({ comment: '', comments: newComments });
      })
      .catch((error) => {
        window.alert(`AddDocumentError: ${error}`);
      });
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
          <div className="commentList">
            {this.state.comments.map(c => (
              <div key={c.commentId} className="commentList_comment">
                <div className="c">{c.comment}</div>
                <div className="n">{c.userName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

Document.defaultProps = {
  user: {
    userId: '',
    displayName: '',
    photoUrl: '',
  },
};

export default Document;
