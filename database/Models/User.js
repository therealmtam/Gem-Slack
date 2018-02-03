const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  userImgUrl: {
    type: Sequelize.STRING,
  },
  rooms: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

const initUser = () => User.sync();

/**
 * Adds a user to the database
 * @param  {} newUser - User data saved to db.
 */
const addUser = (newUser) => {
  const formatted = {
    username: newUser.username,
    userImgUrl: newUser.userImgUrl,
    rooms: newUser.rooms,
  };
  User.sync({ force: true })
    .then(() => User.create(formatted))
    .catch((err) => {
      console.log('ADD USER ERROR ', err);
    });
};

const updateUser = (name, room) => User.update({ rooms: room }, { where: { username: name } });

/**
 * Retrieves all Users from the database
 * @returns A promise that will get all users.
 */
const getUsers = () => User.findAll();

/**
 * Retrieves the user by ID
 * @param {} name - name of user
 * @returns A userId
 */
const getUserById = name => User.findOne({ where: { username: name } });

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
module.exports.updateUser = updateUser;
module.exports.initUser = initUser;
