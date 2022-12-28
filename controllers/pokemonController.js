const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const { Pokemon, Region, PokemonType } = require("../exports/models");
const crypto = require("crypto");
const fs = require("fs")

exports.getPokemon = async (req, res, next) => {
  try {
    const pokemonObj = await Pokemon.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Region,
        },
        {
          model: PokemonType,
        },
      ],
    });

    const pokemon = pokemonObj.map((res) => res.get({ plain: true }));

    res.render("adminPokemon/admin-pokemon", {
      nav: true,
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
    const regionsObj = await Region.findAll({ where: { user_id: req.user.id } });
    const typesObj = await PokemonType.findAll({ where: { user_id: req.user.id } });

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

    const regionsObj = await Region.findAll({ where: { user_id: req.user.id } });
    const typesObj = await PokemonType.findAll({ where: { user_id: req.user.id } });
    const pokemonObj = await Pokemon.findOne({ where: { id, user_id: req.user.id } });

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
    const pokemonObj = await Pokemon.findOne({ where: { id, user_id: req.user.id } });

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
    const imgFile = req.file;

    if (imgFile && name && region && type) {
      await Pokemon.create({
        id: crypto.randomUUID(),
        regionIdRegion: region,
        pokemonTypeIdType: type,
        name,
        photo_path: imgFile.filename,
        user_id: req.user.id
      });

      req.flash("msg", "Pokemon creado con exito");
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

    const pokemon = await Pokemon.findOne({ where: { id, user_id: req.user.id } });
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
        photo_path: imgFile ? imgFile.filename : pokemon.dataValues.photo_path
      }
    );

    req.flash("msg", "Pokemon editado con exito");
    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeletePokemon = async (req, res, next) => {
  try {
    const id = req.body.id;

    const pokemon = await Pokemon.findOne({ where: { id, user_id: req.user.id } });

    if (pokemon) {
      const img = pokemon.dataValues.photo_path;

      fs.unlinkSync(`./public/assets/images/uploaded/${img}`);

      await pokemon.destroy();

      req.flash("msg", "Pokemon eliminado con exito");
    }

    res.redirect("/admin-pokemon");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
