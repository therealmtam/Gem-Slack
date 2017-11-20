const Sequelize = require('sequelize');
const db = require('../index');

const Message = db.define('Message', {
  message: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  roomId: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
});

const addMessage = (data) => {
  const formatted = {
    message: data.message,
    userId: data.userId,
    roomId: data.roomId,
    createdAt: data.createdAt,
  };
  Message.sync({ force: false }).then(() => Message.create(formatted));
};


module.exports.getMessages = () => Message.findAll();
module.exports.addMessage = addMessage;
