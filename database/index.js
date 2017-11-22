const Sequelize = require('sequelize');
// const DB = require('../config.js');

//  Parameters are database name, username ,password
<<<<<<< 9b8e0754753fa9954305631f5d89f25bb6ab7e75
const sequelize = new Sequelize(`${DB.DATABASE}`, `${DB.USERNAME}`, `${DB.PASSWORD}`, {
  host: `${DB.HOST}`,
=======
// const sequelize = new Sequelize(`${DB.DATABASE}`, `${DB.USERNAME}`, `${DB.PASSWORD}`, {
//   host: `${DB.URI}`,
//   dialect: 'postgres',
//   pool: {
//     max: 1000000,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

const sequelize = new Sequelize(`slack`, `postgres`, `john123aj`, {
  host: `localhost`,
>>>>>>> rebase
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
    native: true,
  },
  pool: {
    max: 1000000,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

