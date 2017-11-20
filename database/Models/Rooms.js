const Sequelize = require('sequelize');
const db = require('../index');

const Room = db.define('Message', {
  roomname: {
    type: Sequelize.STRING,
  },
});

const addRoom = (data) => {
  const formatted = {
    roomname: data.roomname,
  };
  Room.sync({ force: false }).then(() => Room.create(formatted));
};


module.exports.getRooms = () => Room.findAll();
module.exports.addRoom = addRoom;
