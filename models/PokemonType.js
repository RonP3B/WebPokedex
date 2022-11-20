const Sequelize = require("sequelize");

const sequelizeObj = require("../util/databaseObj");

const PokemonType = sequelizeObj.define("pokemon_type", {
  id_type: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = PokemonType;
