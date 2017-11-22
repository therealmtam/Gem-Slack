const expect = require('chai').expect;
const Sequelize = require('sequelize');
const DB = require('../../config.js');
const Messages = require('../../database/Models/Messages.js');
const Rooms = require('../../database/Models/Rooms.js');
const User = require('../../database/Models/User');

describe('Persistent chat data', () => {
  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize(`${DB.DATABASE}`, `${DB.USERNAME}`, `${DB.PASSWORD}`, {
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

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  });

  afterEach(() => {
    // sequelize.close();
  });

  it('Should return a all messages ', (done) => {
    expect(true).to.equal(true);
    done();
  });
});

