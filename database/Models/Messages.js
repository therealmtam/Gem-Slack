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
 * @returns A promise that will get all Messages.
 */
const getMessages = () => Message.findAll({
  attributes: ['message'],
  order: [['createdAt', 'DESC']],
});

const getRoomMessages = room => Message.findAll({ where: {roomname: room} });

const deleteAllMessages = () => {
  Message.destroy({ where: {} });
};


module.exports.getMessages = getMessages;
module.exports.addMessage = addMessage;
module.exports.getRoomMessages = getRoomMessages;
module.exports.initMessage = initMessage;
module.exports.deleteAllMessages = deleteAllMessages;
