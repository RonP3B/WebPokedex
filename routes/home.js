const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.getHome);
router.post("/", homeController.postHome);

module.exports = router;
