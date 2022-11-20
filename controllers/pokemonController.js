const crypto = require("crypto");
const Region = require("../models/Region");
const PokemonType = require("../models/PokemonType");
const Pokemon = require("../models/Pokemon");

exports.getPokemon = (req, res, next) => {
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

      res.render("adminPokemon/admin-pokemon", {
        pokemon,
        noPokemon: pokemon.length === 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddPokemon = async (req, res, next) => {
  const regionsObj = await Region.findAll();
  const typesObj = await PokemonType.findAll();
  const regions = regionsObj.map((result) => result.dataValues);
  const types = typesObj.map((result) => result.dataValues);

  res.render("adminPokemon/save-pokemon", {
    edit: false,
    noData: regions.length === 0 || types.length === 0,
    regions,
    types,
  });
};

exports.getEditpokemon = async (req, res, next) => {
  const regionsObj = await Region.findAll();
  const typesObj = await PokemonType.findAll();
  const regions = regionsObj.map((result) => result.dataValues);
  const types = typesObj.map((result) => result.dataValues);
  const id = req.params.id;

  Pokemon.findOne({ where: { id } })
    .then((result) => {
      const pokemon = result.dataValues;

      if (!pokemon) return res.redirect("/admin-pokemon");

      res.render("adminPokemon/save-pokemon", {
        edit: true,
        noData: regions.length === 0 || types.length === 0,
        regions,
        types,
        pokemon,
        typeId: pokemon.pokemonTypeIdType,
        regionId: pokemon.regionIdRegion,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeletePokemon = (req, res, next) => {
  const id = req.params.id;

  Pokemon.findOne({ where: { id } })
    .then((result) => {
      const pokemon = result.dataValues;

      if (!pokemon) return res.redirect("/admin-pokemon");

      res.render("confirm", {
        model: "pokemon",
        modelMsg: "este pokemon",
        page: "pokemon",
        id: pokemon.id,
        name: pokemon.name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddPokemon = (req, res, next) => {
  const { image, name, region, type } = req.body;

  Pokemon.create({
    id: crypto.randomUUID(),
    regionIdRegion: region,
    pokemonTypeIdType: type,
    name,
    photo_url: image,
  })
    .then((result) => {
      res.redirect("/admin-pokemon");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditPokemon = (req, res, next) => {
  const { id, image, name, region, type } = req.body;

  Pokemon.update(
    {
      name,
      regionIdRegion: region,
      pokemonTypeIdType: type,
      name,
      photo_url: image,
    },
    { where: { id } }
  )
    .then((result) => {
      return res.redirect("/admin-pokemon");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeletePokemon = (req, res, next) => {
  const id = req.body.id;

  Pokemon.destroy({ where: { id } })
    .then((result) => {
      res.redirect("/admin-pokemon");
    })
    .catch((err) => {
      console.log(err);
    });
};
