const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const crypto = require("crypto");
const Region = require("../models/Region");
const PokemonType = require("../models/PokemonType");
const Pokemon = require("../models/Pokemon");

exports.getPokemon = async (req, res, next) => {
  try {
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

    const pokemon = pokemonObj.map((res) => res.dataValues);

    res.render("adminPokemon/admin-pokemon", {
      pokemon,
      noPokemon: pokemon.length === 0,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getAddPokemon = async (req, res, next) => {
  try {
    const regionsObj = await Region.findAll();
    const typesObj = await PokemonType.findAll();
    const regions = regionsObj.map((res) => res.dataValues);
    const types = typesObj.map((res) => res.dataValues);

    res.render("adminPokemon/save-pokemon", {
      edit: false,
      noData: regions.length === 0 || types.length === 0,
      regions,
      types,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getEditpokemon = async (req, res, next) => {
  try {
    const id = req.params.id;
    const regionsObj = await Region.findAll();
    const typesObj = await PokemonType.findAll();
    const pokemonObj = await Pokemon.findOne({ where: { id } });
    const regions = regionsObj.map((res) => res.dataValues);
    const types = typesObj.map((res) => res.dataValues);

    if (!pokemonObj) return res.redirect("/admin-pokemon");

    const pokemon = pokemonObj.dataValues;

    res.render("adminPokemon/save-pokemon", {
      edit: true,
      noData: regions.length === 0 || types.length === 0,
      regions,
      types,
      pokemon,
      typeId: pokemon.pokemonTypeIdType,
      regionId: pokemon.regionIdRegion,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getDeletePokemon = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pokemonObj = await Pokemon.findOne({ where: { id } });

    if (!pokemonObj) return res.redirect("/admin-pokemon");

    const pokemon = pokemonObj.dataValues;
    res.render("confirm", {
      model: "pokemon",
      modelMsg: "este pokemon",
      page: "pokemon",
      id: pokemon.id,
      name: pokemon.name,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postAddPokemon = async (req, res, next) => {
  try {
    const { image, name, region, type } = req.body;

    if (image && name && region && type) {
      await Pokemon.create({
        id: crypto.randomUUID(),
        regionIdRegion: region,
        pokemonTypeIdType: type,
        name,
        photo_url: image,
      });
    }

    res.redirect("/admin-pokemon");
  } catch (error) {}
};

exports.postEditPokemon = async (req, res, next) => {
  try {
    const { id, image, name, region, type } = req.body;

    if (image && name && region && type && id) {
      await Pokemon.update(
        {
          name,
          regionIdRegion: region,
          pokemonTypeIdType: type,
          photo_url: image,
        },
        { where: { id } }
      );
    }

    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeletePokemon = async (req, res, next) => {
  try {
    const id = req.body.id;
    await Pokemon.destroy({ where: { id } });
    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
