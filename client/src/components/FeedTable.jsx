import React from 'react';
// import PropTypes from 'prop-types';

import FeedRow from './FeedRow';
// import User from './user';
// import firebase from '../lib/firebase';
import FeedService from '../domain/FeedService';

const FeedTable = () => (
  <div className="feeds">
    {FeedService.list().map(feed => (<FeedRow key={feed.itemId} feed={feed} />))}
  </div>
);

export default FeedTable;
