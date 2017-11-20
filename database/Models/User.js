const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.STRING,
  },
});

/**
 * Adds a user to the database
 * @param  {} newUser - User data saved to db.
 */
const addUser = (newUser) => {
  const formatted = {
    username: newUser.username,
    avatar: newUser.avatar,
  };
  User.sync({ force: false }).then(() => User.create(formatted));
};

/**
 * Retrieves all Users from the database
 * @returns A promise that will get all users.
 */
const getUsers = () => User.findAll();

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
