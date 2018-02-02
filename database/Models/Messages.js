const Sequelize = require('sequelize');
const db = require('../index');

const Message = db.define('Message', {
  message: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  roomname: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  userImgUrl: {
    type: Sequelize.STRING,
  },
});

const initMessage = () => { Message.sync(); };

/**
 * Adds a message to the database
 * @param  {} newMessage - Message saved to db.
 */
const addMessage = (newMessage) => {
  const formatted = {
    message: newMessage.message,
    username: newMessage.username,
    roomname: newMessage.roomname,
    createdAt: newMessage.createdAt,
    userImgUrl: newMessage.userImgUrl,
  };
  Message.sync({ force: false }).then(() => Message.create(formatted));
};

/**
 * Retrieves all Messages from the database sorted by date created
 * @returns A promise with all messages passed in as a parameter.
 */
const getMessages = () => Message.findAll({
  attributes: ['message'],
  order: [['createdAt', 'DESC']],
});

/**
 * Retrieves a specific room's Messages from the database
 * @returns A promise with the room's messages passed in as a parameter.
 */
const getRoomMessages = room => Message.findAll({ where: {roomname: room} });

/**
 * Deletes all Messages from the Messages table in the database
 * @returns A promise.
 */
const deleteAllMessages = callback => Message.destroy({ where: {} })
};

module.exports.getMessages = getMessages;
module.exports.addMessage = addMessage;
module.exports.getRoomMessages = getRoomMessages;
module.exports.initMessage = initMessage;
module.exports.deleteAllMessages = deleteAllMessages;
