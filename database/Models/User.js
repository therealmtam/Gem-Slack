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

// User.sync();
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
  User.sync({ force: false }).then(() => User.create(formatted));
};

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
const getUserById = (name) => {
  return User.findOne({ where: { username: name } })
};

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
