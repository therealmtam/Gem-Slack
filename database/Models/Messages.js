const Sequelize = require('sequelize');
const db = require('../index');

const Message = db.define('Message', {
  message: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  roomId: {
    type: Sequelize.INTEGER,
  },
  // createdAt: {
  //   type: Sequelize.DATE,
  // },
});

/**
 * Adds a message to the database
 * @param  {} newMessage - Message saved to db.
 */
const addMessage = (newMessage) => {
  const formatted = {
    message: newMessage.message,
    userId: newMessage.userId,
    roomId: newMessage.roomId,
    // createdAt: newMessage.createdAt,
  };
  Message.sync({ force: false }).then(() => Message.create(formatted));
};

/**
 * Retrieves all Messages from the database sorted by date created
 * @returns A promise that will get all Messages.
 */
const getMessages = () => Message.findAll({
  attributes: ['message'],
  order: [['createdAt', 'DESC']],
});

const getRoomMessages = room => Message.findAll({ roomId: room });


module.exports.getMessages = getMessages;
module.exports.addMessage = addMessage;
module.exports.getRoomMessages = getRoomMessages;
