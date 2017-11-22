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

// File.sync({force: true}).then(() => {
//   console.log('File Created');
//   return File.create({
//     file: 'This is Slack Demo',
//     userId: 1,
//     roomId: 1,
//   });
// });

/**
 * Adds a File to the database
 * @param  {} newFile - File saved to db.
 */
const addFile = (newFile) => {
  const formatted = {
    file: newFile.file,
    userId: newFile.userId,
    roomId: newFile.roomId,
  };
  File.sync({ force: false }).then(() => File.create(formatted));
};

/**
 * Retrieves all Files from the database
 * @returns A promise that will get all Files.
 */
const getFiles = () => File.findAll();

module.exports.getFiles = getFiles;
module.exports.addFile = addFile;
