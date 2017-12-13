import React from 'react';
// import PropTypes from 'prop-types';

import FeedRow from './FeedRow';
// import User from './user';
import firebase from '../lib/firebase';
// import FeedService from '../domain/FeedService';

class FeedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
    };
    this.getFeeds();
  }

  getFeeds() {
    firebase.feeds().then((querySnapshot) => {
      const feeds = [];
      querySnapshot.forEach((doc) => {
        const feed = doc.data();
        feed.itemId = doc.id;
        feeds.push(feed);
      });
      this.setState({ feeds });
    });
  }

  render() {
    return (
      <div className="feeds">
        {this.state.feeds.map(feed => (<FeedRow key={feed.itemId} feed={feed} />))}
      </div>
    );
  }
}

export default FeedTable;
