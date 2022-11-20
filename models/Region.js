const Sequelize = require("sequelize");

const sequelizeObj = require("../util/databaseObj");

const Region = sequelizeObj.define("regions", {
  id_region: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Region;
