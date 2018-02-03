const Sequelize = require('sequelize');
const db = require('../index');

const Room = db.define('Room', {
  roomname: {
    type: Sequelize.STRING,
    unique: true,
  },
});

/**
 * Adds a room to the database
 * @param  {} newRoom - Room name saved to db.
 */
const addRoom = (newRoom) => {
  const formatted = {
    roomname: newRoom.roomname,
  };
  Room.sync({ force: true })
    .then(() => Room.create(formatted))
    .catch((err) => {
      console.log('ADD ROOM ERROR ', err);
    });
};

/**
 * Retrieves all Rooms from the database
 * @returns A promise that will get all rooms.
 */
const getRooms = () => Room.findAll();

const getRoomById = (id) => {
  console.log('im being used');
  return Room.findOne({ where: { id: id } });
};

const initRoom = () => {
  addRoom({ roomname: 'Lobby' });
};

module.exports.getRooms = getRooms;
module.exports.addRoom = addRoom;
module.exports.getRoomById = getRoomById;
module.exports.initRoom = initRoom;
