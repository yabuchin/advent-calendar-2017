import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const FeedRow = props => (
  <Link to={`/document/${props.feed.itemId}`}>
    <div className="feedRow">
      <div className="title">{props.feed.title}</div>
      <div className="description">{props.feed.description}</div>
      <div className="user">{props.feed.userName}</div>
    </div>
  </Link>
);

FeedRow.propTypes = {
  feed: PropTypes.shape({
    itemId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    userIconUrl: PropTypes.string,
  }).isRequired,
};

export default FeedRow;
