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

const addUser = (data) => {
  const formatted = {
    username: data.username,
    avatar: data.avatar,
  };
  User.sync({ force: false }).then(() => User.create(formatted));
};

module.exports.getUsers = () => User.findAll();
module.exports.addUser = addUser;
