const Pokemon = require("../models/Pokemon");
const Region = require("../models/Region");
const PokemonType = require("../models/PokemonType");

exports.getHome = async (req, res, next) => {
  const regionsObj = await Region.findAll();
  const regions = regionsObj.map((result) => result.dataValues);

  Pokemon.findAll({
    include: [
      {
        model: Region,
      },
      {
        model: PokemonType,
      },
    ],
  })
    .then((result) => {
      const pokemon = result.map((result) => result.dataValues);

      res.render("home", {
        warningTitle: "no hay ningún pokemon registrado",
        pokemon,
        regions,
        noRegions: regions.length === 0,
        noPokemon: pokemon.length === 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postHome = async (req, res, next) => {
  const post = req.query.post;
  const data = req.body.value;
  const regionsObj = await Region.findAll();
  const regions = regionsObj.map((result) => result.dataValues);

  Pokemon.findAll({
    where: { [post]: data },
    include: [
      {
        model: Region,
      },
      {
        model: PokemonType,
      },
    ],
  })
    .then((result) => {
      const pokemon = result.map((result) => result.dataValues);
      const msg = post === "name" ? "con ese nombre" : "de esa región";

      res.render("home", {
        warningTitle: `no hay ningún pokemon ${msg}`,
        pokemon,
        regions,
        noRegions: regions.length === 0,
        noPokemon: pokemon.length === 0,
        post,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
