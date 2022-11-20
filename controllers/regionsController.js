const crypto = require("crypto");
const Region = require("../models/Region");

exports.getRegions = (req, res, next) => {
  Region.findAll()
    .then((result) => {
      const regions = result.map((result) => result.dataValues);

      res.render("adminRegions/admin-region", {
        regions,
        noRegions: regions.length === 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddRegion = (req, res, next) => {
  res.render("adminRegions/save-region", { edit: false });
};

exports.getEditRegion = (req, res, next) => {
  const id = req.params.id;

  Region.findOne({ where: { id_region: id } })
    .then((result) => {
      const region = result.dataValues;
      if (!region) return res.redirect("/admin-regions");
      res.render("adminRegions/save-region", { edit: true, region });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteRegion = (req, res, next) => {
  const id = req.params.id;

  Region.findOne({ where: { id_region: id } })
    .then((result) => {
      const region = result.dataValues;

      if (!region) return res.redirect("/admin-regions");

      res.render("confirm", {
        model: "region",
        modelMsg: "esta region",
        page: "regions",
        id: region.id_region,
        name: region.name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddRegion = (req, res, next) => {
  Region.create({
    id_region: crypto.randomUUID(),
    name: req.body.name,
  })
    .then((result) => {
      res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditRegion = (req, res, next) => {
  const { id, name } = req.body;

  Region.update({ name, id_region: id }, { where: { id_region: id } })
    .then((result) => {
      return res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteRegion = (req, res, next) => {
  const id = req.body.id;

  Region.destroy({ where: { id_region: id } })
    .then((result) => {
      res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};
