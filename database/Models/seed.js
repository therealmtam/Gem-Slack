const sampleUsers = [
  {
    username: 'therealmtam', imgUrl: 1,
  },
  {
    username: 'theericlau', imgUrl: 1,
  },
  {
    username: 'pic.jpg', imgUrl: 2,
  },
  {
    username: 'excel.xls', imgUrl: 3,
  },
];

const sampleMessages = [
  {
    message: 'Hello world!', userId: 1, roomId: '1', createdAt: '2017-11-21T19:39:48.279Z',
  },
  {
    message: 'Hi guys', userId: 3, roomId: '1', createdAt: '2017-11-21T19:39:48.280Z',
  },
  {
    message: 'Hey Eric', userId: 2, roomId: '1', createdAt: '2017-11-21T19:39:48.281Z',
  },
];

const sampleRooms = [
  {
    roomname: 'Lobby',
  },
  {
    roomname: 'therealmtam, theericlau, theJohn, theJeff',
  },
  {
    roomname: 'therealmtam, theJeff',
  },
];

const sampleFiles = [
  {
    file: 'test.js', userId: 1,
  },
  {
    file: 'word.doc', userId: 1,
  },
  {
    file: 'pic.jpg', userId: 2,
  },
  {
    file: 'excel.xls', userId: 3,
  },
];

module.exports.sampleUsers = sampleUsers;
module.exports.sampleMessages = sampleMessages;
module.exports.sampleRooms = sampleRooms;
module.exports.sampleFiles = sampleFiles;
