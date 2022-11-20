const Sequelize = require("sequelize");

const sequelizeObj = require("../util/databaseObj");

const Pokemon = sequelizeObj.define("pokemons", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  photo_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Pokemon;
