const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const Pokemon = require("../models/Pokemon");
const Region = require("../models/Region");
const PokemonType = require("../models/PokemonType");

exports.getHome = async (req, res, next) => {
  try {
    const regionsObj = await Region.findAll();
    const pokemonObj = await Pokemon.findAll({
      include: [
        {
          model: Region,
        },
        {
          model: PokemonType,
        },
      ],
    });

    const regions = regionsObj.map((res) => res.dataValues);
    const pokemon = pokemonObj.map((res) => res.dataValues);

    res.render("home", {
      warningTitle: "no hay ningún pokemon registrado",
      pokemon,
      regions,
      noRegions: regions.length === 0,
      noPokemon: pokemon.length === 0,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postHome = async (req, res, next) => {
  try {
    const post = req.query.post;
    const data = req.body.value;
    const msg = post === "name" ? "con ese nombre" : "de esa región";
    const regionsObj = await Region.findAll();
    const pokemonObj = await Pokemon.findAll({
      where: { [post]: data },
      include: [
        {
          model: Region,
        },
        {
          model: PokemonType,
        },
      ],
    });

    const regions = regionsObj.map((res) => res.dataValues);
    const pokemon = pokemonObj.map((res) => res.dataValues);

    res.render("home", {
      warningTitle: `no hay ningún pokemon ${msg}`,
      pokemon,
      regions,
      noRegions: regions.length === 0,
      noPokemon: pokemon.length === 0,
      post,
      data,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
