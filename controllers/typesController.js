const crypto = require("crypto");
const PokemonType = require("../models/PokemonType");

exports.getTypes = (req, res, next) => {
  PokemonType.findAll()
    .then((result) => {
      const types = result.map((result) => result.dataValues);

      res.render("adminTypes/admin-types", {
        types,
        noTypes: types.length === 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddTypes = (req, res, next) => {
  res.render("adminTypes/save-type", { edit: false });
};

exports.getEditTypes = (req, res, next) => {
  const id = req.params.id;

  PokemonType.findOne({ where: { id_type: id } })
    .then((result) => {
      const type = result.dataValues;
      if (!type) return res.redirect("/admin-types");
      res.render("adminTypes/save-type", { edit: true, type });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteTypes = (req, res, next) => {
  const id = req.params.id;

  PokemonType.findOne({ where: { id_type: id } })
    .then((result) => {
      const type = result.dataValues;

      if (!type) return res.redirect("/admin-types");

      res.render("confirm", {
        model: "tipo",
        modelMsg: "este tipo",
        page: "types",
        id: type.id_type,
        name: type.name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddTypes = (req, res, next) => {
  PokemonType.create({
    id_type: crypto.randomUUID(),
    name: req.body.name,
  })
    .then((result) => {
      res.redirect("/admin-types");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditTypes = (req, res, next) => {
  const { id, name } = req.body;

  PokemonType.update({ name, id_type: id }, { where: { id_type: id } })
    .then((result) => {
      return res.redirect("/admin-types");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteTypes = (req, res, next) => {
  const id = req.body.id;

  PokemonType.destroy({ where: { id_type: id } })
    .then((result) => {
      res.redirect("/admin-types");
    })
    .catch((err) => {
      console.log(err);
    });
};
