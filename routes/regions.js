const express = require("express");
const regionsController = require("../controllers/regionsController");

const router = express.Router();

router.get("/", regionsController.getRegions);
router.get("/add", regionsController.getAddRegion);
router.get("/edit/:id", regionsController.getEditRegion);
router.get("/delete/:id", regionsController.getDeleteRegion);

router.post("/add", regionsController.postAddRegion);
router.post("/edit", regionsController.postEditRegion);
router.post("/delete", regionsController.postDeleteRegion);

module.exports = router;
