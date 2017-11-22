const Sequelize = require('sequelize');
// const DB = require('../config.js');

 Parameters are database name, username ,password
const sequelize = new Sequelize(`${DB.DATABASE}`, `${DB.USERNAME}`, `${DB.PASSWORD}`, {
  host: `${DB.HOST}`,
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

// const sequelize = new Sequelize(`gem`, `ericlau`, ``, {
//   host: `localhost`,
//   dialect: 'postgres',
//   pool: {
//     max: 1000000,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

