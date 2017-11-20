const Sequelize = require('sequelize');
const db = require('../index');

const File = db.define('File', {
  file: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  roomId: {
    type: Sequelize.INTEGER,
  },
});

const addFile = (data) => {
  const formatted = {
    file: data.file,
    userId: data.userId,
    roomId: data.roomId,
  };
  File.sync({ force: false }).then(() => File.create(formatted));
};


module.exports.getFiles = () => File.findAll();
module.exports.addFile = addFile;
