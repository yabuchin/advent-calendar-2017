class FeedService {
  constructor() {
    this.feedList = [
      {
        itemId: '1',
        title: 'feed1',
        description: 'feed1 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '2',
        title: 'feed2',
        description: 'feed2 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '3',
        title: 'feed3',
        description: 'feed3 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '4',
        title: 'feed4',
        description: 'feed4 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '5',
        title: 'feed5',
        description: 'feed5 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
    ];
  }

  list() {
    return this.feedList;
  }
}

export default new FeedService();
