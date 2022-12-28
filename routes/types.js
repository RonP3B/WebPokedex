const express = require("express");
const typesController = require("../controllers/typesController");

const router = express.Router();

router.get("/", typesController.getTypes);
router.get("/add", typesController.getAddTypes);
router.get("/edit/:id", typesController.getEditTypes);
router.get("/delete/:id", typesController.getDeleteTypes);

router.post("/add", typesController.postAddTypes);
router.post("/edit", typesController.postEditTypes);
router.post("/delete", typesController.postDeleteTypes);

module.exports = router;
