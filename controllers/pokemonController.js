const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const crypto = require("crypto");
const fs = require("fs")
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
    const { name, region, type } = req.body;
    const imgFile = req.file

    if (imgFile && name && region && type) {
      await Pokemon.create({
        id: crypto.randomUUID(),
        regionIdRegion: region,
        pokemonTypeIdType: type,
        name,
        photo_path: imgFile.filename,
      });
    }

    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postEditPokemon = async (req, res, next) => {
  try {
    const { id, name, region, type } = req.body;
    const imgFile = req.file

    if (!name || !region || !type || !id) {
      return res.redirect("/admin-pokemon");
    }

    const pokemon = await Pokemon.findByPk(id)
    const photoPath = pokemon.dataValues.photo_path

    if (imgFile && imgFile.filename !== photoPath) {
      fs.unlinkSync(
        `./public/assets/images/uploaded/${photoPath}`
      );
    }

    await pokemon.update(
      {
        name,
        regionIdRegion: region,
        pokemonTypeIdType: type,
        photo_path: imgFile ? imgFile.filename : pokemon.dataValues.photo_path,
      }
    );

    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeletePokemon = async (req, res, next) => {
  try {
    const id = req.body.id;

    const pokemon = await Pokemon.findByPk(id);

    if (pokemon) {
      const img = pokemon.dataValues.photo_path;
      fs.unlinkSync(`./public/assets/images/uploaded/${img}`);
      await pokemon.destroy();
    }

    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
