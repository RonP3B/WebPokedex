const internalErrorRes = require("../util/helpers/res/internalErrorRes");
const crypto = require("crypto");
const Region = require("../models/Region");

exports.getRegions = async (req, res, next) => {
  try {
    const regionObj = await Region.findAll();
    const regions = regionObj.map((res) => res.dataValues);

    res.render("adminRegions/admin-region", {
      regions,
      noRegions: regions.length === 0,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getAddRegion = (req, res, next) => {
  res.render("adminRegions/save-region", { edit: false });
};

exports.getEditRegion = async (req, res, next) => {
  try {
    const id = req.params.id;
    const regionObj = await Region.findOne({ where: { id_region: id } });

    if (!regionObj) return res.redirect("/admin-regions");

    const region = regionObj.dataValues;

    res.render("adminRegions/save-region", { edit: true, region });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.getDeleteRegion = async (req, res, next) => {
  try {
    const id = req.params.id;
    const regionObj = await Region.findOne({ where: { id_region: id } });

    if (!regionObj) return res.redirect("/admin-regions");

    const region = regionObj.dataValues;

    res.render("confirm", {
      model: "region",
      modelMsg: "esta region",
      page: "regions",
      id: region.id_region,
      name: region.name,
    });
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postAddRegion = async (req, res, next) => {
  try {
    const name = req.body.name;

    if (name) {
      await Region.create({
        id_region: crypto.randomUUID(),
        name,
      });
    }

    res.redirect("/admin-regions");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postEditRegion = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (id && name) {
      await Region.update(
        { name, id_region: id },
        { where: { id_region: id } }
      );
    }

    res.redirect("/admin-regions");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeleteRegion = async (req, res, next) => {
  try {
    const id = req.body.id;
    await Region.destroy({ where: { id_region: id } });
    res.redirect("/admin-regions");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
};
