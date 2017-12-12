class FeedService {
  constructor() {
    this.feedList = [
      {
        itemId: '1',
        title: 'feed1',
        url: '',
        description: 'feed1 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '2',
        title: 'feed2',
        url: '',
        description: 'feed2 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '3',
        title: 'feed3',
        url: '',
        description: 'feed3 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '4',
        title: 'feed4',
        url: '',
        description: 'feed4 description',
        userId: '1',
        userName: 'yabu',
        userIconUrl: '',
      },
      {
        itemId: '5',
        title: 'feed5',
        url: '',
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

  add(title, url, description) {
    const id = this.feedList.length + 1;
    this.feedList.unshift({
      itemId: id.toString(),
      title,
      url,
      description,
      userId: '1',
      userName: 'yabu',
      userIconUrl: '',
    });
  }
}

export default new FeedService();
