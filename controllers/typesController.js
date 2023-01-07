const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const crypto = require("crypto");
const PokemonType = require("../models/PokemonType");

exports.getTypes = async (req, res, next) => {
  try {
    const typeObj = await PokemonType.findAll({ where: { user_id: req.session.user.id } });
    const types = typeObj.map((res) => res.dataValues);

    res.render("adminTypes/admin-types", {
      nav: true,
      types,
      noTypes: types.length === 0,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getAddTypes = (req, res, next) => {
  res.render("adminTypes/save-type", { edit: false });
};

exports.getEditTypes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const typeObj = await PokemonType.findOne({ where: { id_type: id, user_id: req.session.user.id } });

    if (!typeObj) return res.redirect("/admin-types");

    const type = typeObj.dataValues;

    res.render("adminTypes/save-type", { edit: true, type });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getDeleteTypes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const typeObj = await PokemonType.findOne({ where: { id_type: id } });

    if (!typeObj) return res.redirect("/admin-types");

    const type = typeObj.dataValues;

    res.render("confirm", {
      model: "tipo",
      modelMsg: "este tipo",
      page: "types",
      id: type.id_type,
      name: type.name,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postAddTypes = async (req, res, next) => {
  try {
    const name = req.body.name;

    if (name) {
      await PokemonType.create({
        id_type: crypto.randomUUID(),
        user_id: req.session.user.id,
        name,
      });

      req.flash("msg", "Tipo de pokemon creado con exito");
    }

    res.redirect("/admin-types");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postEditTypes = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (id && name) {
      await PokemonType.update(
        { name },
        { where: { id_type: id, user_id: req.session.user.id } }
      );

      req.flash("msg", "Tipo de pokemon editado con exito");
    }

    res.redirect("/admin-types");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeleteTypes = async (req, res, next) => {
  try {
    const id = req.body.id;
    const type = await PokemonType.findOne({ where: { id_type: id, user_id: req.session.user.id } });

    if (type) {
      await type.destroy();
      req.flash("msg", "Tipo de pokemon eliminado con exito");
    }

    res.redirect("/admin-types");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
