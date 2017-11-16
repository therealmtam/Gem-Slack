const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
});

const getUsers = () => {
  return User.findAll();
};

module.exports.getUsers = getusers;
