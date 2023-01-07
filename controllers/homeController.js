const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const { Pokemon, Region, PokemonType } = require("../exports/models");

exports.getHome = async (req, res, next) => {
  try {
    const regionsObj = await Region.findAll({ where: { user_id: req.session.user.id } });
    const pokemonObj = await Pokemon.findAll({
      where: { user_id: req.session.user.id },
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
      nav: true,
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
    const regionsObj = await Region.findAll({ where: { user_id: req.session.user.id } });
    const pokemonObj = await Pokemon.findAll({
      where: { [post]: data, user_id: req.session.user.id },
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
      nav: true,
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
