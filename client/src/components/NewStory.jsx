import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

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
      userId: this.props.user.userId,
      userName: this.props.user.displayName,
      userIconUrl: this.props.user.photoUrl,
    };

    // 新しいバッチ処理を生成
    const batch = firebase.db.batch();
    const docId = uuid();

    // user/documentsに記事を追加
    const docRef =
      firebase.db
        .collection('users')
        .doc(this.props.user.userId)
        .collection('documents')
        .doc(docId);
    batch.set(docRef, feed);

    // documentsに記事を追加
    const feedRef =
      firebase.db
        .collection('documents')
        .doc(docId);
    batch.set(feedRef, feed);

    // バッチをコミット
    batch.commit()
      .then(() => {
        // 成功したら、ログを出して、フィート一覧に戻る
        window.console.log('document create succeeded');
        this.props.history.push('/');
      })
      .catch((error) => {
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
  user: PropTypes.shape({
    userId: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

NewStory.defaultProps = {
  user: {
    userId: '',
    displayName: '',
    photoUrl: '',
  },
};

export default NewStory;
