import React from 'react';
import PropTypes from 'prop-types';

const FeedRow = props => (
  <div className="feedRow">
    <div className="title">{props.feed.title}</div>
    <div className="description">{props.feed.description}</div>
    <div className="user">{props.feed.userName}</div>
  </div>
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
