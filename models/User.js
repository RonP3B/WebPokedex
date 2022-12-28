const Sequelize = require("sequelize");

const sequelizeObj = require("../util/databaseObj");

const User = sequelizeObj.define("users", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
