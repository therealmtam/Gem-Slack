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

/**
 * Retrieves the user by ID
 * @param {} name - name of user
 * @returns A userId
 */
const getUserById = (name) => {
  User.findOne({ where: { username: name } })
    .then(result => result.id);
};

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
